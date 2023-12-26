from bson import ObjectId
from models.events import Event

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
    

            