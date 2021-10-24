import pickle
import pandas as pd 


fc3 = pd.read_excel("./1-1. 이커머스 FC주문 데이터_3월.csv", sheet_name=0)
print("fc3")


fc3.to_feather("fc_3.ftr")

fc4 = pd.read_excel("./1-2. 이커머스 FC주문 데이터_4월.csv", sheet_name=0)
print("fc4")


fc4.to_feather("fc_4.ftr")

fc5 = pd.read_excel("./1-3. 이커머스 FC주문 데이터_5월.csv", sheet_name=0)
print("fc5")


fc5.to_feather("fc_5.ftr")

fc6 = pd.read_excel("./1-4. 이커머스 FC주문 데이터_6월.csv", sheet_name=0)
print("fc6")


fc6.to_feather("fc_6.ftr")


