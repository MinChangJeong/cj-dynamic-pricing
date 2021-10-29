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
    predict_result, s_data = inverse_trans()

    predict_value = []
    for i in range(len(predict_result)):
        if predict_result[i][0] < s_data:
            append_data = -300 + (300 * (predict_result[i][0] - predict_result.min() ) / ( s_data- predict_result.min()) )
            predict_value.append(append_data)
        else:
            append_data = 300 - (300 * ( predict_result.max() - predict_result[i][0] ) / ( predict_result.max() -  s_data) )            
            predict_value.append(append_data)

    print(predict_result)
    print(predict_value)
    # data to dict
    req_data_dict = json.loads(request.data.decode("utf-8"))

    result_dict = {}
    flag = False
    
    for i in range(1, 4):
        for j in range(0, 24, 2):
            if (i == 1) and ( (req_data_dict["time"] >= j) and (req_data_dict["time"] < j+2 )):
                flag = True
                if j % 2 == 0:
                    is_start = j + 2
                    count = 1
                elif j % 2 == 1:
                    is_start = j + 1
                    count = 0
                continue
            if flag == True:
                result_dict[str(i) + "_" + str(j)] = int(( (predict_value[count] + predict_value[count+1]) / 2 )) - (int(( (predict_value[count] + predict_value[count+1]) / 2 )) % 10)                 
                count = count + 2
<<<<<<< HEAD

=======
>>>>>>> 1c9105c2bdf2a5e1c9f3481b640dd0da4f481d60

    predict_result_set = predict_result[:-is_start]


    print(result_dict)

    if req_data_dict["btnType"] == "btnCor":
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
    elif req_data_dict["btnType"] == "btnIndi":
        distance_weight, time_weight, discount_weight, option_weight, price_weight, distance, time, quantity, fee_, price, delivery = set_fee(req_data_dict)

        return {
            "distance_weight": distance_weight,
            "time_weight" : time_weight,
            "discount_weight" : discount_weight,
            "option_weight" : option_weight,
            "price_weight" : price_weight,
            "distance" : distance,
            "time" : time,
            "quantity" : quantity,
            "fee_" : fee_,
            "price" : price,
            "delivery" : delivery,    
            "predict" : result_dict      
        }
    # predict_data = inverse_trans()
