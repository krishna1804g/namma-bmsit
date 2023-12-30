import pymongo
from config import users_collection
from flask_bcrypt import Bcrypt
from flask_jwt_extended import current_user

bcrypt = Bcrypt()

class Users:
    def __init__(self, name, email, phone, password, admin=False):
        self.name = name
        self.email = email
        self.phone = phone
        self.password = password
        self.admin = admin
        self.events_id = None
        
    @staticmethod
    def create_index():
        users_collection.create_index( [ ( 'email', pymongo.ASCENDING ) ] , unique = True)
        
    def add_user(self):
        try:
            self.create_index()
            users_collection.insert_one(self.__dict__)
        except pymongo.errors.DuplicateKeyError as e:
            raise ValueError(f"email already exists") from e
        except pymongo.errors.PyMongoError as e:
            raise ValueError( f" Error Creating the event: { str(e) } " )
        except Exception as e:
            raise ValueError( f" Error: { str(e) } " ) 
        
    @classmethod
    def add_event_to_user(cls, user_id, event_id):
        try:
            user_cursor = users_collection.find_one({"_id": user_id})

            if user_cursor:
                updated_event_ids = user_cursor.get("events_id", [])
                # check if event already exist
                if event_id in updated_event_ids:
                    return "event already registered", 200
                updated_event_ids.append(event_id)

                users_collection.update_one(
                    {"_id": user_id},
                    {"$set": {'events_id': updated_event_ids}}
                )
                return "event registered!!", 200
            else:
                return "user not found", 404
        except pymongo.errors.PymongoError as e:
            raise ValueError(f" Error: {str(e)} ")
        

    @classmethod
    def look_registered_event_ids(cls, user_id):
        try:
            user_cursor = users_collection.find_one({"_id": user_id})
            if user_cursor:
                try:
                    event_ids = user_cursor.get("events_id", [])
                except Exception as e:
                    return {str(e)}, 400
                if not event_ids:
                    return "no event registered!", 400
                return event_ids, 200
            else:
                return "user not found", 404
        except pymongo.errors.PymongoError as e:
            raise ValueError(f" Error: {str(e)} ")
        
    @classmethod
    def get_user_through_id(cls, user_id):
        try:   
            user_cursor = users_collection.find_one({"_id":user_id}, {"password":0, "events_id":0})
            if user_cursor:
                user_cursor["_id"] = str(user_cursor["_id"])
                return user_cursor, 200
            else:
                return "user not found", 404
        except pymongo.errors.PyMongoError as e:
                raise ValueError( f" Error Creating the event: { str(e) } " )

def find_user_through_email(user_email):
    try:
        user_cursor = users_collection.find_one({"email": user_email}, {"password":0})
        if not user_cursor:
            raise ValueError("No user found..")

        # Convert the original _id to a string and remove the original _id field
        user_cursor["_id"] = str(user_cursor.pop("_id"))

        return user_cursor
    except pymongo.errors.PymongoError as e:
        raise ValueError(f" Error: {str(e)} ")


def authenticate_user(email, password):
    try:   
        current_user = users_collection.find_one({"email":email})
        if current_user and  bcrypt.check_password_hash(current_user['password'], password):
            return current_user, 200
        else:
            return None, 404
    except pymongo.errors.PyMongoError as e:
            raise ValueError( f" Error Creating the event: { str(e) } " )
        