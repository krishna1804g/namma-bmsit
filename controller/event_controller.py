from flask import jsonify
from bson import ObjectId
from models.events import Event
from models.users import Users
def add_event(title, description, dept, venue, date_of_event, time_of_event, amount, rules_regulations, image_url):
    try:
        event_instance = Event(title, description, dept, venue, date_of_event, time_of_event, amount, rules_regulations, image_url)
        event_instance.insert_event()
        return "Event added successfully..!!"
    except ValueError as e:
        return {"error": f"{e}"} , 401
    
def get_all_events():
    try:
        all_events = Event.fetch_all_events_data()
        event_list = []   
        for single_event in all_events:
            single_event['_id'] = str(single_event['_id'])
            event_list.append(single_event)
               
        return event_list
    except ValueError as e:
        return {"error", f"{e}"}, 402
    
def get_event_fron_id(event_id):
    event_id = ObjectId(event_id)
    try:
        result = Event.get_event_by_id(event_id)
        return result
    except ValueError as e:
        return {"error", f"{e}"}, 402
    
def add_user_to_event(participant_id, event_id):
    try:
        event_id = ObjectId(event_id)
        response, status_code = Event.add_participant_to_event(participant_id, event_id)
        return response, status_code
    except Exception as e:
        return jsonify(f"error {e}"), 400
    
    
def get_all_participants(event_id):
    try:
        event_id = ObjectId(event_id)
        participants_ids_list_response, status_code = Event.participants_of_event(event_id)
        print(participants_ids_list_response)
        participants_list = []
        if status_code == 200:
            for participant_id in participants_ids_list_response:
                response, status_code = Users.get_user_through_id(ObjectId(participant_id))
                if status_code == 404:
                    return response, 404
                # response["_id"] = str(response["_id"])
                participants_list.append(response)   
            return participants_list, 200
          
        return response, status_code
    except Exception as e:
        return jsonify(f"error {e}"), 400