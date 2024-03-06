from pymongo.collection import Collection
from bson import json_util
import json

def list_products(database: Collection):
    return json.loads(json_util.dumps(database['product'].find()))

def populate(database: Collection):
    database['product'].drop()
    productData = [{'product': 'Discount Travel Package'}, {'product': 'Premium Pass'},{'product': 'Agency App'},{'product': 'Agency Website'},{'product': 'Other'}]

    for product in productData:
        database['product'].insert_one(product)