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

with open("./data/category.json", "r") as l:
    CATEGORY = json.load(l)


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
# {"sendLocation":"서울특별시 종로구","getLocation":"광주광역시 서구","option":[true,false],"quantity":"11000","category":"가구/인테리어"}
# [35.1461, 126.9231] N 10000
    if req_data_dict["btnType"] == "btnCor":

        time = int(req_data_dict["time"])
        send_location = LOCATION[req_data_dict["sendLocation"]]
        get_location = LOCATION[req_data_dict["getLocation"]]
        option = "F" if req_data_dict["option"][0] else "N" ## 상온, 냉장/냉동
        quantity = int(req_data_dict["quantity"])
        category = CATEGORY[req_data_dict["category"]]

        sender = (send_location[0], send_location[1])
        receiver = (get_location[0], get_location[1])

        distance = haversine(sender, receiver)


        print(send_location, get_location, option, quantity, category)

    elif req_data_dict["btnType"] == "btnIndi":
        send_location = LOCATION[req_data_dict["location"]]
        price = req_data_dict["price"]
        if req_data_dict["price"][0]:
            option = "N" ## 새벽
        elif req_data_dict["price"][1]:
            option = "F" ## 당일
        elif req_data_dict["price"][2]:
            option = "B" ## 일반
         
        print(send_location, option, price)

    sender = ()
    receiver = ()

    distance = haversine(sender, receiver)
    return "yes"
