import datetime
import pymongo
from config import events_collection

class Event:
    def __init__(self, 
    title, description, dept, venue, date_of_event, time_of_event, amount, rules_regulations, image_url, participants=None
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
        self.participants = participants
        
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
            all_events_data = events_collection.find()
            return list(all_events_data)
        except pymongo.errors.PymongoError as e:
            raise ValueError( f" Error: { str(e) } " ) 
        
    @classmethod
    def get_event_by_id(cls, event_id):
        try:
            event_curssor = events_collection.find_one({"_id":event_id})
            if not event_curssor:
                raise ValueError("No event found..")
            
            event_curssor["_id"] = str(event_curssor["_id"])
            
            return event_curssor
        except pymongo.errors.PymongoError as e:
            raise ValueError( f" Error: { str(e) } " ) 
                
                
    @classmethod
    def add_participant_to_event(cls, user_id, event_id):
        try:
            event_cursor = events_collection.find_one({"_id": event_id})

            if event_cursor:
                updated_participant_ids = event_cursor.get("users_registered", [])
                
                # check if user already exist
                if user_id in updated_participant_ids:
                    return "user already registered", 200
                
                updated_participant_ids.append(user_id)

                events_collection.update_one(
                    {"_id": event_id},
                    {"$set": {'participants': updated_participant_ids}}
                )
                return "user added!!", 200
            else:
                return "event not found", 404
        except pymongo.errors.PymongoError as e:
            raise ValueError(f" Error: {str(e)} ")
        
    @classmethod
    def participants_of_event(cls, event_id):
        try:
            event_cursor = events_collection.find_one({"_id": event_id})
            if event_cursor:
                try:
                    participants_ids = event_cursor.get("participants", [])
                except Exception as e:
                    return {str(e)}, 400
                if not participants_ids:
                    return "no participants", 400
                return participants_ids, 200
            else:
                return "event not found", 404
        except pymongo.errors.PymongoError as e:
            raise ValueError( f" Error: { str(e) } " ) 