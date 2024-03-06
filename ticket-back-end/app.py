from flask import Flask, request
import pymongo
from flask_cors import CORS, cross_origin

import business_logic.ticket as ticket
import business_logic.user as user
import business_logic.product as product

app  = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mongo_client = pymongo.MongoClient('mongodb://127.0.0.1:27017/')
db = mongo_client['ticket_db']

@app.route('/')
@app.route('/index')
def index():
    return 'Welcome to the Ticket App API'

@app.route('/api/user/new', methods=['POST'])
def insert_user():
    return user.insert_user(db, request.get_json())
    
@app.route('/api/user/login', methods=['POST'])
def login():
    return user.authenticate(db, request.get_json())

@app.route('/api/user/get', methods=['GET'])
def get_users():
    return user.get_users(db) 

@app.route('/api/ticket/new', methods=['POST'])
def insert_ticket():
    return ticket.insert_ticket(db, request.get_json())

@app.route('/api/ticket/get', methods=['GET'])
def get_tickets():
    return ticket.get_tickets(db)

@app.route('/api/ticket/<id>/assign_dev', methods=['PUT'])
def assign_dev(id: str):
    return ticket.assign_dev(db, id, request.get_json()['email']) 

@app.route('/api/ticket/<id>/assign_product', methods=['PUT'])
def assign_product(id: str):
    return ticket.assign_product(db, id, request.get_json()['product']) 

@app.route('/api/ticket/<id>/assign_severity', methods=['PUT'])
def assign_severity(id: str):
    return ticket.severity(db, id, request.get_json()['severity']) 
                    
@app.route('/api/ticket/<id>/delete', methods=['DELETE'])
def delete_ticket(id: str):
    return ticket.delete_ticket(db, id)
    
@app.route('/api/product/get', methods=['GET'])
def list_products():
    return product.list_products(db)

@app.route('/api/populate', methods=['GET'])
def populate():
    user.populate(db)
    product.populate(db)
    ticket.populate(db)
    return 'Populated database'

if __name__ == '__main__':
    app.run(debug=True)