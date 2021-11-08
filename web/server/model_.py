from numpy import result_type
import numpy as np
from pandas.core.frame import DataFrame 
import pickle
from model import set_fee_model
import json
from silence_tensorflow import silence_tensorflow
from haversine import haversine
import os

silence_tensorflow()
np.seterr(all="ignore")

with open("./data/location.json", "rb") as l:
    LOCATION = json.load(l)

with open("./data/category.json", "r") as c:
    CATEGORY = json.load(c)

MODEL_FEE = set_fee_model.set_fee

with open("./data/category_count.json", "r") as cc:
    CATEGORY_COUNT = json.load(cc)

def model_preprocessing(df, scaler):
    if str(type(df)) == "<class 'pandas.core.frame.DataFrame'>":
        data_np = np.array(df["품목수량"]).reshape(-1, 1)
    else:
        data_np = df.reshape(-1, 1)

    return scaler.transform(data_np)


def model_run_and_forecast(model, data, PREDICT_TIME):
    data_rs = data.reshape(1, 12, 1)
    forecast_results = []
    ## forecast
    for i in range(PREDICT_TIME):
        forecast_result = model.predict(data_rs.reshape(1, 12, 1), batch_size = 1)
        forecast_results.append(forecast_result[0][0])

        data_rs = np.append(data_rs, [forecast_result])[1:]
    past_data = data[-1][0]

    return forecast_results, past_data


def inverse_trans():

    with open("./result/predict_result.pickle", "rb") as f:
        predict = pickle.load(f)
    
    with open("./model/scaler.pickle", "rb") as s:
        scaler = pickle.load(s)

    return scaler.inverse_transform(np.array(predict[0]).reshape(-1, 1)), scaler.inverse_transform(np.array(predict[1].reshape(1, -1)))[0][0]


def set_fee(req_data_dict):
    if req_data_dict["btnType"] == "btnCor":

        time = int(req_data_dict["time"])
        send_location = LOCATION[req_data_dict["sendLocation"]]
        get_location = LOCATION[req_data_dict["getLocation"]]
        quantity = int(req_data_dict["quantity"])
        option = req_data_dict["option"]

        storage = "I" if (req_data_dict["category"] == "식품" ) and (option[1]) else "F" 

        sender = (send_location[0], send_location[1])
        receiver = (get_location[0], get_location[1])

        distance = haversine(sender, receiver)

        initial_fee = 2100
        set_option_fee = np.array([distance, time, quantity])
        distance_weight, time_weight, discount_weight, total = MODEL_FEE(set_option_fee)

        category_weight = 0
        if storage == "I":
            category_weight = category_weight + 300

        fee_ = total + initial_fee - time_weight
        last_fee_ = fee_ + category_weight

        time_weight = 0
        return int(distance_weight), int(time_weight), (200-int(discount_weight)), int(category_weight), int(last_fee_), int(time), int(distance), storage, int(quantity)

    elif req_data_dict["btnType"] == "btnIndi":
        time = req_data_dict["time"]
        receiver = LOCATION[req_data_dict["location"]]

        price = int(req_data_dict["price"])

        if req_data_dict["option"][0]:
            option = "N" ## 당일
        elif req_data_dict["option"][1]:
            option = "F" ## 새벽
        elif req_data_dict["option"][2]:
            option = "B" ## 일반
         
        sender = (37.384, 127.314)

        quantity = 1
        distance = haversine(sender, receiver)
        set_option_fee = np.array([distance, time, quantity])

        initial_fee = 2100

        distance_weight, time_weight, discount_weight, total = MODEL_FEE(set_option_fee)

        print(discount_weight)

        option_weight = 0
        if option == "N":
            option_weight = 300
            delivery = "당일배송"
        elif option == "F": 
            option_weight =  500
            delivery = "새벽배송"
        else:
            option_weight = 0
            delivery = "일반배송" 

        if (price >= 500000) and ( price < 1000000):
            price_weight =  2000
        elif (price >= 1000000) and ( price < 2000000):
            price_weight =  4000
        elif (price >= 2000000) and ( price < 3000000):
            price_weight = 6000
        else:
            price_weight = 0

        fee_ = total + initial_fee - discount_weight  
        last_fee_ = fee_ + option_weight

        return int(distance_weight), int(time_weight), (200-int(discount_weight)), int(option_weight), int(price_weight), int(distance), int(time), int(quantity), int(last_fee_), int(price), delivery

    # sender = ()
    # receiver = ()

    # distance = haversine(sender, receiver)


    return "yes"
