import datetime

import pymongo
from config import events_collection

class Event:
    def __init__(self, 
    title, description, dept, venue, date_of_event, time_of_event, amount, rules_regulations, image_url
    ):
        self.title = title
        self.description = description
        self.dept = dept
        self.venue = venue
        self.date_of_event = date_of_event
        self.time_of_event = time_of_event
        self.amount = amount
        self.rules_regulations = rules_regulations
        self.image_url = image_url
        self.time_of_creation = datetime.datetime.now()
        self.time_of_updation = datetime.datetime.now()
        
    @staticmethod
    def create_index():
        events_collection.create_index( [ ( 'title', pymongo.ASCENDING ) ] , unique = True)
        
    def insert_event(self):
        try:
            self.create_index()
            events_collection.insert_one(self.__dict__)
        except pymongo.errors.DuplicateKeyError as e:
            raise ValueError(f"A event with same title -> '{self.title}' already exists.") from e
        except pymongo.errors.PyMongoError as e:
            raise ValueError( f" Error Creating the event: { str(e) } " )
        except Exception as e:
            raise ValueError( f" Error: { str(e) } " ) 
        
    @classmethod
    def fetch_all_events_data(cls):
        try:
            all_events_data = events_collection.find({}, {"_id":0})
            return list(all_events_data)
        except pymongo.errors.PymongoError as e:
            raise ValueError( f" Error: { str(e) } " ) 
        