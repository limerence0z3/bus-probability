import requests as req
import json

class Authority:
    def __init__(self, id: str, key: str, url: str):
        self.id = id
        self.key = key
        self.url = url
    
    def getHeader(self) -> dict:
        content_type = 'application/x-www-form-urlencoded'
        grant_type = 'client_credentials'

        return{
            'content-type' : content_type,
            'grant_type' : grant_type,
            'client_id' : self.id,
            'client_secret' : self.key
        }
        
class Access:
    
    app_id = '411077028-b7085344-39be-40a5'
    app_key = '7f01e6b2-3b98-44b6-b51b-9180c6454e22'
    auth_url="https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token"
    
    @staticmethod
    def createHeader() -> dict:
        header = Authority(Access.app_id, Access.app_key, Access.auth_url).getHeader()
        response = req.post(Access.auth_url, header)
        auth_JSON = json.loads(response.text)
        access_token = auth_JSON.get('access_token')

        return {
            'authorization': 'Bearer '+ access_token
        }