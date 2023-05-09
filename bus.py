import odata
import datetime as dt
import data_access as da
import requests as req
import json
from sql import sql
from analyze import analyze

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
    
    history_url_prefix = "https://tdx.transportdata.tw/api/historical/v2/Historical/Bus/RealTimeNearStop/City/"
    busstop_url_prefix = "https://tdx.transportdata.tw/api/basic/v2/Bus/DisplayStopOfRoute/City/"
    
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
            Direction: 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']\n
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
        for res in response:
            info = {}
            info["RouteUID"] = res["RouteUID"]
            info["RouteName"] = res["RouteName"]["Zh_tw"]
            info["Direction"] = res["Direction"]
            routes.append(info)
            
        return routes 
        
    def getRouteInfos(self, city: str, routeUID: str, routeName: str, direction: int, datetime: dt.datetime, day: int = 60) -> dict:
        """
        取得公車資訊\n
        
        parameter:\n
        city(str): 城市名稱\n
        routeUID(str): 路徑的UID\n
        routeName(str): 路徑的名稱\n
        direction(int): 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']\n
        datetime(datetime.datetime): 搭車時間\n
        day(int): 資料範圍天數\n
        return\n
        info(dict): {\n
            time: 搭車時間\n
            routeName: 路徑名稱\n
            possibility: 客滿機率\n        
        }\n
        """
        
        try:
            city = cities[city]
        except KeyError:
            pass
        
        db = sql.DB()
        collection = db.getStatuses(city, routeUID, direction, datetime, day)
        
        try:
            possiblity = collection.count(100) / len(collection)
        except ZeroDivisionError:
            closeTime = db.getCloseTime(city, routeUID, direction, datetime, day)
            hour = closeTime.seconds // 3600
            minute = (closeTime.seconds // 60) % 60
            new_datetime = dt.datetime(datetime.year, datetime.month, datetime.day, hour, minute)
            collection = db.getStatuses(city, routeUID, direction, new_datetime, day)
            possiblity = collection.count(100) / len(collection)
            
        info = {
            "time": datetime,
            "routeName": routeName,
            "possiblity": possiblity,
        }
        
        return info
        
    def get_route_info(self, city: str, routeUID: str, routeName: str, direction: int, datetime: dt.datetime, day: int = 60) -> dict:
        try:
            city = cities[city]
        except KeyError:
            pass
        
        db = sql.DB()
        collection = db.get_statuses(city, routeUID, direction, datetime, day)
        
        try:
            analyzer = analyze.Analyzer(collection)
            full_predict = analyzer.predict(datetime)[0]
        except ValueError:
            full_predict = collection[0]["status"]
            
        return {
            "time": datetime,
            "routeName": routeName,
            "predicted": full_predict
        }
        
        
    
    
    
if __name__ == '__main__':
    import datetime
    explorer = BusExplorer()
    # print(explorer.getRoutes("Tainan", stopName = "三五甲"))
    # print(explorer.getRouteInfos("PingtungCounty", 'PIF0919', "511", 1, datetime.datetime(2023, 10, 1, 9, 41)))
    print(explorer.get_route_info("臺東縣", 'TTT0982', "市區環線", 1, datetime.datetime(2023, 5, 1, 8, 41)))