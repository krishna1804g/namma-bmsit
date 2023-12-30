from bson import ObjectId
from flask import jsonify
from models.users import(
    Users, 
    authenticate_user, 
    find_user_through_email
)
from controller.event_controller import get_event_fron_id
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def register_new_user(user_data):
    name = user_data['name']
    email = user_data['email']
    phone = user_data['phone']
    password = user_data['password']
    
    # hash the password before storing
    hashed_password = bcrypt.generate_password_hash(password)
    
    new_user = Users(name, email, phone, hashed_password)
    
    try:
        new_user.add_user()
        return "user registred successfully..!!"
    except Exception as e:
        return jsonify(f"error {e}"), 400
    

def get_user_from_id(user_id):
    user_id = ObjectId(user_id)
    try:
        result = Users.get_user_through_id(user_id)
        return result
    except ValueError as e:
        return {"error", f"{e}"}, 402  
  
  
def get_user_by_email(user_email):
    try:
        user_data = find_user_through_email(user_email)
        # user_data["id"] = str(user_data['_id'])
        return user_data
    except ValueError as e:
        return {"error": f"{e}"}, 402


def login_user(user_data):
    email = user_data['email']
    password = user_data['password']
    
    try:
        user_auth, status_code = authenticate_user(email, password)
        if user_auth and status_code == 200:
            del user_auth['password']
            user_auth["_id"] = str(user_auth["_id"])
            
            return user_auth, 200
        else:
            return jsonify("wrong credentials"), 401
    except Exception as e:
        return jsonify(f"error {e}"), 400
    
def book_event(user_id, event_id):
    try:
        user_id = ObjectId(user_id)
        response, status_code = Users.add_event_to_user(user_id, event_id)
        return response, status_code
    except Exception as e:
        return jsonify(f"error {e}"), 400

def registered_events(user_id):
    try:
        user_id = ObjectId(user_id)
        event_ids_list_response, status_code = Users.look_registered_event_ids(user_id)
        event_list = []
        if status_code == 200:
            for event_id in event_ids_list_response:
                response = get_event_fron_id(event_id)
                event_list.append(response)   
            return event_list, 200
          
        return response, status_code
    except Exception as e:
        return jsonify(f"error {e}"), 400