import pandas as pd
from sklearn import linear_model, preprocessing
import datetime as dt

class Analyzer:
    def __init__(self, collection: list[dict]):
        table = self.__parse(collection)
        self.__model = self.__createModel(table)
        
    def __parse(self, collection: list[dict]) -> pd.DataFrame:
        
        table = {}
        for data in collection:
            table[data["date"]] = 0 if data["status"] == 0 else 1
            
        table = pd.DataFrame(list(table.items()), columns = ["date", "status"])
        return table
    
    def __createModel(self, table: pd.DataFrame) -> linear_model.LogisticRegression:
        encoder = preprocessing.LabelEncoder()
        x = encoder.fit_transform(table["date"])
        y = table["status"]

        model = linear_model.LogisticRegression()
        model.fit(x.reshape(-1, 1), y)
        
        return model
            
    def predict(self, date: dt.datetime):
        unknown_x = pd.Series([date.strftime("%Y-%m-%d")])
        encoder = preprocessing.LabelEncoder()
        unknown_x = encoder.fit_transform(unknown_x)
        return self.__model.predict(unknown_x.reshape(-1, 1))
    
        