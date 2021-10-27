from datetime import datetime, timedelta
import redis
import numpy as np
import pandas as pd
import time
import pickle
import threading
from prediction import model_run, model_preprocessing
from keras.models import load_model

with open("./model/scaler.pickle", 'rb') as p:
    SCALER = pickle.load(p)

INITIAL_DATA = pd.read_csv("./data/initial_data.csv")
PREDICT_MODEL = load_model("./model/model.h5")
PREDICT_TIME = 3*24
rd = redis.StrictRedis(host="localhost", port=6379, db=1)

### initial model
initial_x = model_preprocessing(INITIAL_DATA, SCALER)
predict_result = model_run(PREDICT_MODEL, initial_x, PREDICT_TIME)

with open("./result/predict_result.pickle", "wb") as r:
    pickle.dump(predict_result, r, pickle.HIGHEST_PROTOCOL)


### initial redis
for i in range(1, (PREDICT_TIME + 1)):
    rd.set(i, 0)

### time, result update per hour

# while True:

#     ## time update
#     time.sleep(10)
#     print("Time Update")

#     new_time_set = {PREDICT_TIME : 0}
#     for index in range(1, PREDICT_TIME + 1):
#         if index == 1:
#             time_index1 = rd.get(index).decode("utf-8")
#         else:
#             new_time_set[index-1] = rd.get(index).decode("utf-8")


#     for key, values in new_time_set.items():
#         rd.set(key, int(values)+1)
    
#     ## predict data update
#     update_data = predict_result[0] + SCALER.transform([[time_index1]])
#     test_predict = np.append(initial_x, update_data)[1:]

#     ## reset data, update result
#     initial_x = test_predict
#     predict_result = model_run(PREDICT_MODEL, initial_x, PREDICT_TIME)

#     with open("./result/predict_result.pickle", "wb") as r:
#         pickle.dump(predict_result, r, pickle.HIGHEST_PROTOCOL)


    




