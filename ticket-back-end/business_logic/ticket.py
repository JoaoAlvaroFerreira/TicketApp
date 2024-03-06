from flask import Response
from pymongo.collection import Collection
from bson import json_util, ObjectId
import json

def insert_ticket(database: Collection,ticket: dict) -> Response:
    try:
        database['ticket'].insert_one(ticket)
        return Response("Ticket added successfully.",status=200)
    except Exception as e:
        print('An exception occurred in ticket insertion - ', e)
        return Response("Server error.",status=500)

def get_tickets(database: Collection):
    return json.loads(json_util.dumps(database['ticket'].find())) 

def assign_dev(database: Collection, id: str, email: str):
    try:
        res = database['user'].find_one({'email': email})
        if not res:
            return Response("No user with that email exists.",status=400)
        database['ticket'].update_one({'_id': ObjectId(id)}, { '$set':{'dev': email}})
        return Response("Ticket updated successfully.",status=200)
    except Exception as e:
        print('An exception occurred in ticket update - ', e)
        return Response("Server error.",status=500)

def assign_product(database: Collection, id: str, product: str):
    try:
        res = database['product'].find_one({'product': product})
        if not res:
            return Response("No product with that name exists.",status=400)
        database['ticket'].update_one({'_id': ObjectId(id)}, { '$set':{'product': product}})
        return Response("Ticket updated successfully.",status=200)
    except Exception as e:
        print('An exception occurred in ticket update - ', e)
        return Response("Server error.",status=500)

def severity(database: Collection, id: str, severity: str):
    try:
        database['ticket'].update_one({'_id': ObjectId(id)}, { '$set':{'severity': severity}})
        return Response("Ticket updated successfully.",status=200)
    except Exception as e:
        print('An exception occurred in ticket update - ', e)
        return Response("Server error.",status=500)

def delete_ticket(database: Collection, id: str) -> Response:
    try:
        database.ticket.delete_one({'_id': ObjectId(id)})
        return Response("Ticket deleted successfully.",status=200)
    except Exception as e:
        print('An exception occurred in ticket deletion - ', e)
        return Response("Server error.",status=500)

def populate(database: Collection):
    database['ticket'].drop()
    ticketsData = [{
                    "author": "roger@test.com",
                    "title": "Pass not validated",
                    "product": "Premium Pass",
                    "description": "The premium pass service was not validated by security, I had to make a second purchase without a discount.",
                    "affiliation": "AIC Inc",
                    "severity": 2,
                    "dev": "jonathan.good@test.com"
                    }, 
                   {
                    "author": "tyson.smith@example.com",
                    "title": "Website 404",
                    "product": "Agency Website",
                    "severity": 3,
                    "description": "When trying to sign in with facebook, the agency website will return a 404 error. Other sign in options worked fine.",
                    "affiliation": "JPW Corp"
                    },
                    {
                    "author": "jason.jordan@example.com",
                    "title": "No follow up",
                    "product": "Other",
                    "severity": 1,
                    "description": "I had a booked reservation and did not get an e-mail confirming it near the date.",
                    "affiliation": "Kurt Gable Affiliates"
                    }]

    for ticket in ticketsData:
        database['ticket'].insert_one(ticket)