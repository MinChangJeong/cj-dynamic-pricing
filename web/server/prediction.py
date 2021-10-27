


from numpy import result_type
import numpy as np
from pandas.core.frame import DataFrame 

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
        forecast_result = model.predict(data_rs, batch_size = 1)
        forecast_results.append(forecast_result[0][0])

        data_rs = np.append(data_rs, [forecast_result])[1:]


    return forecast_results
