from flask import Response
from pymongo.collection import Collection
from bson import json_util
import json


def insert_user(database: Collection,user: dict) -> Response:
    try:
        database['user'].insert_one(user)
        return '200'
    except Exception as e:
        print('An exception occurred in user insertion - ', e)
        return '400'

def authenticate(database: Collection, user: dict) -> Response:
    try:
        res = list(database['user'].find({"email": user['email']}))

        if not res:
            return Response("No account with that e-mail exists.",status=400)
        
        hash = res[0]['password'].encode('utf-8')
        password = user['password'].encode('utf-8')
        print(hash)
        print(password)

        if hash == password: #would use checkpw method with full auth implementation
            return Response("User authentication validated.",status=200)
        else:
            return Response("Wrong password.",status=400)
    except Exception as e:
        print('An exception occurred in user authentication - ', e)
        return Response("Server error.",status=500)

def get_users(database: Collection):
    return json.loads(json_util.dumps(database['user'].find())) 

def populate(database: Collection):
    database['user'].drop()
    userData = [{'name': 'John Smith', 'email': 'johnsmith@test.com', 'password': '$2a$10$ZmySODTGAHdAQ/SymsUC3.2jbdckPeFAZ1SdeTVdA83X4hIP.FNI6'}, #password johnsmith
                {'name': 'Jane Doe', 'email': 'janedoe@example.com', 'password': '$2a$10$ZmySODTGAHdAQ/SymsUC3.KYyyPhHAm6F130AJD9L64FMQJQJVPeu'}, #password janedoe
                {'name': 'Jonathan Good', 'email': 'jonathan.good@test.com', 'password': '$2a$10$ZmySODTGAHdAQ/SymsUC3.O83hJzzrIoGzHKJ5IItPWdahqwVGEGS'}] #password jonathangood
    
    for user in userData:
        database['user'].insert_one(user)
