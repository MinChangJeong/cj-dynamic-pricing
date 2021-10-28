from flask import Flask, send_from_directory, request
from flask.helpers import make_response
from flask.wrappers import Response
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployment
from API import API
import pickle
import numpy as np
import redis
from datetime import datetime, timedelta
from threading import Thread
import time
import json
from time_update_module import time_update_thread
from model_ import inverse_trans, set_fee
from silence_tensorflow import silence_tensorflow
silence_tensorflow()

np.seterr(all="ignore")

rd = redis.StrictRedis(host="localhost", port=6379, db=1)

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)  # comment this on deployment
api = Api(app)

thread = Thread(target=time_update_thread)
thread.daemon = True
thread.start()


with open("./model/set_fee_mode.pickle", 'rb') as p:
    TRAIN_MODEL = pickle.load(p)


@app.route("/calc/", methods=['GET', 'POST'])
def calc():
    # data to dict
    req_data_dict = json.loads(request.data.decode("utf-8"))
    distance_weight, time_weight, discount_weight, category_weight, fee_ , time, distance, storage, quantity= set_fee(req_data_dict)

    storage = "상온" if storage == "F" else "냉장/냉동"

    return {
        "distance_weight": distance_weight,
        "time_weight" : time_weight,
        "discount_weight" : discount_weight,
        "category_weight" : category_weight,
        "fee" : fee_,
        "time" : time,
        "distance" : distance,
        "storage" : storage,
        "quantity" : quantity
    }

    # predict_data = inverse_trans()
