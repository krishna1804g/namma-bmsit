import os
from flask import Flask
from routes.event_route import events
from routes.user_routes import user
from config import jwt

app = Flask(__name__)
app.register_blueprint(events, url_prefix="/events")
app.register_blueprint(user, url_prefix="/user")
jwt.init_app(app)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_headers, jwt_data):
    identity = jwt_data["sub"]

    return {"email": identity}
if __name__ == "__main__":
    app.run(host="192.168.1.6", port=3000, debug=True)