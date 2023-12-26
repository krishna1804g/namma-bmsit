from flask import Flask
from routes.event_route import events

app = Flask(__name__)
app.register_blueprint(events, url_prefix="/events")

if __name__ == "__main__":
    app.run(host="192.168.1.6", port=3000, debug=True)