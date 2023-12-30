from flask import Blueprint, request, jsonify
from controller.user_controller import (
    register_new_user, 
    login_user,
    get_user_by_email,
    book_event,
    registered_events
)
from controller.event_controller import add_user_to_event
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, current_user

user = Blueprint('users',__name__)

bcrypt = Bcrypt()



@user.route("/register", methods=['POST'])
def user_data():
    if request.method == 'POST':
        data = request.get_json()
        result = register_new_user(data)
        return result
    

@user.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        try:
            response, status_code = login_user(data)
            if status_code == 401:
                return response, 401
            print(response)
            # secret_key = current_app.config["SECRET_KEY"]
            # token = jwt.encode({
            #     'user':response,
            #     'expiration': str(datetime.utcnow() + timedelta(hours=1))
            # }, secret_key)
            access_token = create_access_token(identity=(response['email']))
            return jsonify({'access_token': access_token}), 200 
        except Exception as e:
            return jsonify(str(e)), 400


@user.route("/@me")
@jwt_required()
def whoami():
    try:
        current_user_data = get_user_by_email(current_user["email"])
        return jsonify(
            {
                "message": "message",
                "user_details": {
                    "username": current_user_data
                },
            }
        )
    except Exception as e:
        return jsonify(str(e)), 400
    
    
@user.route("/event/book/<string:event_id>")
@jwt_required()
def apply_to_event(event_id):
    current_user_data = get_user_by_email(current_user["email"])
    current_user_id = current_user_data["_id"]
    response, status_code = book_event(current_user_id, event_id)
    return response, status_code

@user.route("/eventsRegistered")
@jwt_required()
def get_registered_events():
    current_user_data = get_user_by_email(current_user["email"])
    current_user_id = current_user_data["_id"]
    response, status_code = registered_events(current_user_id)
    return response, status_code