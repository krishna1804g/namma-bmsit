from flask import Flask
from routes.event_route import events

app = Flask(__name__)
app.register_blueprint(events)

if __name__ == "__main__":
    app.run(host="192.168.173.214", port=3000, debug=True)