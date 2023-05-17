import odata
import datetime as dt
import data_access as da
import requests as req
import json
from sql import sql
from analyze import analyze
import typing
import datetime
import time

cities = {
    "基隆市": "Keelung",
    "高雄市": "Kaohsiung",
    "金門縣": "KinmenCounty",
    "花蓮縣": "HualienCounty",
    "連江縣": "LienchiangCounty",
    "屏東縣": "PingtungCounty",
    "臺中市": "Taichung",
    "澎湖縣": "PenghuCounty",
    "新竹市": "Hsinchu",
    "彰化縣": "ChanghuaCounty",
    "雲林縣": "YunlinCounty",
    "南投縣": "NantouCounty",
    "臺北市": "Taipei",
    "嘉義縣": "ChiayiCounty",
    "新竹縣": "HsinchuCounty",
    "嘉義市": "Chiayi",
    "臺南市": "Tainan",
    "宜蘭縣": "YilanCounty",
    "臺東縣": "TaitungCounty",
    "桃園市": "Taoyuan",
    "苗栗縣": "MiaoliCounty",
    "新北市": "NewTaipei"
}
    

class BusExplorer:
    
    busstop_url_prefix = "https://tdx.transportdata.tw/api/basic/v2/Bus/DisplayStopOfRoute/City/"
    
    direction_table = {0:'去程',1:'返程',2:'迴圈',255:'未知'}
    direction_table1 = {'去程': 0, '返程': 1, '迴圈': 2, '未知':255}
    status_table = {0:'非客滿',1:'車禍',2:'故障',3:'塞車',4:'緊急求援',5:'加油',90:'不明',91:'去回不明',98:'偏移路線',99:'非營運狀態',100:'客滿',101:'包車出租',255:'未知'}
    
    def __init__(self):
        self.header = da.Access.createHeader()
    
    def getRoutes(self, city: str, stopName: str = None, routeName: str = None) -> list[dict]:
        
        """
        尋找符合條件的公車路徑\n
        
        parameter:\n        
        city(str): 城市名稱
        stopName(str): 站別名稱
        routeName(str): 路徑名稱
        
        return:\n
        routes(list[dict]): [\n
            {\n
            RouteUID: 路徑的UID,\n
            RouteName: 路徑的名稱,\n
            Direction: 去返程\n
            Start: 起程站\n
            End: 終點站\n
            }\n
        ]
        """
            
        if stopName:
            filter = "Stops/any(stop:contains(stop/StopName/Zh_tw,'%s'))"%(stopName)
        
        if routeName:
            filter = "RouteName/Zh_tw eq '%s'"%(routeName)
        
        try:
            city = cities[city]
        except KeyError:
            pass
         
        string = odata.ODataString.createString(city, filter = filter)
        
        url = BusExplorer.busstop_url_prefix + string
        
        response = req.get(url = url, headers = self.header)
        
        response = json.loads(response.text.encode("utf-8").decode("utf-8-sig"))
        routes = []
        try:
            for res in response:
                info = {}
                info["RouteUID"] = res["RouteUID"]
                info["RouteName"] = res["RouteName"]["Zh_tw"]
                info["Direction"] = self.direction_table[res["Direction"]]
                info["Start"] = res["Stops"][0]["StopName"]["Zh_tw"]
                info["End"] = res["Stops"][-1]["StopName"]["Zh_tw"]
                routes.append(info)
        except TypeError:
            pass
        
        return routes 
        
    def get_route_info(self, city: str, routeUID: str, routeName: str, direction: typing.Union[int, str], datetime: dt.datetime, day: int = 60) -> dict:
        
        try:
            city = cities[city]
        except KeyError:
            pass
        
        try:
            direction = self.direction_table1[direction]
        except KeyError:
            pass
        

        db = sql.DB()
        collection = db.get_statuses(city, routeUID, direction, datetime, day)
        
        try:
            analyzer = analyze.Analyzer(collection)
            full_predict = analyzer.predict(datetime)[0]
        except ValueError:
            full_predict = collection[0]["status"]
        
        full_predict = self.status_table[full_predict]
        
        return {
            "time": datetime,
            "routeName": routeName,
            "predicted": full_predict
        }
         

explorer = BusExplorer()

def getRoutes(city: str, stopName: str = None, routeName: str = None) -> str:
    data = explorer.getRoutes(city, stopName, routeName)
    return json.dumps(data)

def get_route_info(self, city: str, routeUID: str, routeName: str, direction: typing.Union[int, str], datetime: dt.datetime, day: int = 60) -> str:
    data = explorer.get_route_info(city, routeUID, routeName, direction, datetime, day)
    return json.dumps(data)


if __name__ == '__main__':
    print(get_route_info("臺東縣", "TTT0981", "市區環線", 0))