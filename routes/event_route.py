from flask import request, Blueprint, jsonify
from controller.event_controller import add_event, get_all_events

events = Blueprint("events", __name__)

@events.route('/add/', methods=['POST'])
def add_an_event():
    if request.method == 'POST':
        try:
            data = request.get_json()
            response = add_event(data['title'], data['description'], data['dept'], data['venue'], data['date_of_event'], data['time_of_event'], data['amount'], data['rules_regulations'], data['image_url'])
            return jsonify(response)
        except Exception as e:
            return jsonify(str(e))
    
@events.route('/', methods=['GET'])
def get_all_events_data():
    if request.method == 'GET':
        try:
            response = get_all_events()
            return response
        except Exception as e:
            return jsonify(str(e))

