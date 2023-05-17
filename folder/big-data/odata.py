import urllib.parse

class ODataString:
    
    @staticmethod
    def createString(city: str, select: str = None, filter: str = None,
                top: int = None, skip: int = None,
                order: str = None, format: str = "JSON") -> str:
        
        result = city + "?" + "&%24"
        
        dic = {
            "select": select,
            "filter": filter,
            "top": top,
            "skip": skip,
            "order": order,
            "format": format
        }
        
        newDic = {}
        for d in dic:
            if dic[d]:
                newDic[d] = dic[d]
                
        result += urllib.parse.urlencode(newDic, True)
        
        return result