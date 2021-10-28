from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployment
from API import API
import pickle
import numpy as np
import redis 
from datetime import datetime, timedelta
from threading import Thread
import time
from time_update_module import time_update_thread

rd = redis.StrictRedis(host="localhost", port= 6379, db=0)

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)  # comment this on deployment
api = Api(app)

thread = Thread(target=time_update_thread)
thread.daemon = True
thread.start()


with open("./model/set_fee_mode.pickle", 'rb') as p:
    TRAIN_MODEL = pickle.load(p)


@app.route("/", defaults={'path': ''})
def serve(path):

    return send_from_directory(app.static_folder, 'index.html')


@app.route("/calc", methods=['get'])
def calc():

    d = int(request.args.get("hour", None))
    rd.incr(d)
    
    a = int(request.args.get("one", None))
    b = int(request.args.get("two", None))
    c = int(request.args.get("three", None))
    
    result = TRAIN_MODEL.predict(np.array([[a, b, c]]))

    return {
        "result" : result[0],
        "txt" : "okay"
    }

# api.add_resource(RUN_MODEL, '/calc')
@app.route("/")
def index():
    
    return {
        "task" : "Thread"
    }


