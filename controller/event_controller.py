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
        return all_events
    except ValueError as e:
        return {"error", f"{e}"}, 402
    

            