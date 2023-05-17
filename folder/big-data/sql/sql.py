import pymysql as sql
import datetime as dt

class DB:
    
    def __init__(self):
        self.__conn = sql.connect(host = "127.0.0.1", port = 3306, user = "users", password = "password", database = "bus")
        self.__cursor = self.__conn.cursor()
        self.__conn.ping(reconnect = True)
    
    def close(self):
        self.__conn.close()
        
    def get_statuses(self, city: str, routeUID: str, direction: int, datetime: dt.datetime, num_data: int) -> list:
        
        instruct = """WITH A AS(
            SELECT `date`, MIN(ABS(TIME_TO_SEC(SUBTIME(`time`, {})))) AS min_minute FROM {}
            WHERE routeUID = '{}' AND direction = {} AND TIMESTAMPDIFF(DAY, `date`, (SELECT MAX(`date`) FROM {})) <= {}
            GROUP BY `date`
        )
        
        SELECT {}.`date`, `status` FROM {} JOIN A ON {}.`date` = A.`date` WHERE ABS(TIME_TO_SEC(SUBTIME({}.`time`, {}))) = A.min_minute ORDER BY `date`;
        """
        
        time = datetime.time().strftime("'%H:%M:%S'")
        instruct = instruct.format(time, city, routeUID, direction, city, num_data, city, city, city, city, time)
        
        self.__cursor.execute(instruct)
        self.__conn.commit()
        
        collection = []
        for data in self.__cursor.fetchall():
            collection.append({
                "date": data[0],
                "status": data[1]
            })
            
        return collection