from numpy import result_type
import numpy as np
from pandas.core.frame import DataFrame 
import pickle
import json
from silence_tensorflow import silence_tensorflow
from haversine import haversine

silence_tensorflow()
np.seterr(all="ignore")

with open("./data/location.json", "rb") as l:
    LOCATION = json.load(l)

with open("./data/category.json", "r") as c:
    CATEGORY = json.load(c)

with open("./model/set_fee_mode.pickle", "rb") as m:
    MODEL_FEE = pickle.load(m)

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


    return forecast_results


def inverse_trans():
    with open("/result/predict_result.pickle", "rb") as f:
        predict = pickle.load(f)
    
    with open("./model/caler.pickle", "rb") as s:
        scaler = pickle.load(s)

    return scaler.inverse_transform(np.array(predict).reshape(-1, 1))


def set_fee(req_data_dict):
    if req_data_dict["btnType"] == "btnCor":

        time = int(req_data_dict["time"])
        send_location = LOCATION[req_data_dict["sendLocation"]]
        get_location = LOCATION[req_data_dict["getLocation"]]
        quantity = int(req_data_dict["quantity"])
        # category_count = CATEGORY_COUNT(CATEGORY[req_data_dict["category"]]) ## code_count(codeID)

        storage = "I" if req_data_dict["category"] == "식품" else "F" 

        sender = (send_location[0], send_location[1])
        receiver = (get_location[0], get_location[1])

        distance = haversine(sender, receiver)

        initial_fee = 2100
        set_option_fee = np.array([distance, time, quantity]).reshape(1, -1)
        fee_ = MODEL_FEE.predict(set_option_fee)

        category_weight = 0
        if storage == "I":
            category_weight = category_weight + 300


        distance_weight = (fee_ - initial_fee ) * MODEL_FEE.feature_importances_[0]
        time_weight = (fee_ - initial_fee) * MODEL_FEE.feature_importances_[1]
        discount_weight = (fee_ - initial_fee) * MODEL_FEE.feature_importances_[2]

        last_fee_ = fee_[0] + category_weight

        return int(distance_weight), int(time_weight), int(discount_weight), int(category_weight), int(last_fee_), int(time), int(distance), storage, int(quantity)

    elif req_data_dict["btnType"] == "btnIndi":
        time = req_data_dict["time"]
        receiver = LOCATION[req_data_dict["location"]]

        price = req_data_dict["price"]
        if req_data_dict["price"][0]:
            option = "N" ## 새벽
        elif req_data_dict["price"][1]:
            option = "F" ## 당일
        elif req_data_dict["price"][2]:
            option = "B" ## 일반
         
        sender = (37.384, 127.314)

        quantity = 0
        distance = haversine(sender, receiver)
        set_option_fee = np.array([distance, time, quantity]).reshape(1, -1)

        fee_ = MODEL_FEE.predict(set_option_fee)

        option_weight = 0
        if option == "N":
            option_weight = option_weight + 500
        elif option == "F": 
            option_weight = option_weight + 300
        else:
            option_weight = 0
        
        # if price


        print(receiver, option, price)

    # sender = ()
    # receiver = ()

    # distance = haversine(sender, receiver)


    return "yes"
