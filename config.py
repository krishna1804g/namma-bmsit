from pymongo import MongoClient
import os

uri = os.environ.get('MONGO_URI')

client = MongoClient(uri)

db = client.Events

events_collection = db.events

users_collection = db.users