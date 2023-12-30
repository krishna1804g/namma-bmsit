from pymongo import MongoClient
from flask_jwt_extended import JWTManager
import os


jwt = JWTManager()

uri = os.environ.get('MONGO_URI')

client = MongoClient(uri)

db = client.Events
db_user = client.Users

events_collection = db.events

users_collection = db_user.users