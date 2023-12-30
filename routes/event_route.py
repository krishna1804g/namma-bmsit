from flask import request, Blueprint, jsonify
from controller.event_controller import (
    add_event, 
    get_all_events, 
    get_event_fron_id,
    add_user_to_event,
    get_all_participants
) 
from controller.user_controller import get_user_by_email
from flask_jwt_extended import jwt_required, current_user

events = Blueprint("events", __name__)

@events.route('/add/', methods=['POST'])
@jwt_required()
def add_an_event():
    if request.method == 'POST':
        try:
            data = request.get_json()
            response = add_event(data['title'], data['description'], data['dept'], data['venue'], data['date_of_event'], data['time_of_event'], data['amount'], data['rules_regulations'], data['image_url'])
            return jsonify(response)
        except Exception as e:
            return jsonify(str(e)), 400
    
@events.route('/', methods=['GET'])
def get_all_events_data():
    if request.method == 'GET':
        try:
            response = get_all_events()
            return response
        except Exception as e:
            return jsonify(str(e)), 400

        
@events.route('/<string:event_id>')
def get_event_by_id(event_id):
    if request.method == 'GET':
        try:
            response = get_event_fron_id(event_id)
            return response
        except Exception as e:
            return jsonify(str(e)), 400
        
@events.route("/addPraticipants/<string:event_id>")
@jwt_required()
def get_registered_events(event_id):
    current_participant_data = get_user_by_email(current_user["email"])
    current_participant_id = current_participant_data["_id"]
    response, status_code = add_user_to_event(current_participant_id, event_id)
    return response, status_code
    
@events.route("/getRegisteredParticipants/<string:event_id>")
def registered_participants(event_id):
    all_participants, statuscode = get_all_participants(event_id)
    print(all_participants)
    return all_participants, statuscode
