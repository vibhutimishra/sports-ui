from flask import Flask, jsonify, request
from pymongo import MongoClient
import json
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client.mydatabase
events_collection = db.events
users_collection = db.users

if events_collection.count_documents({}) == 0:
    with open('db.json', 'r') as file:
        data = json.load(file)
    for event_id, event_details in data['events'].items():
        events_collection.insert_one({"_id": event_id, **event_details})

@app.route('/')
def setup_db():
    print("Sports backend service:",)
    return {}

@app.route('/create_user', methods=['POST'])
def create_user():
    user_data = request.json
    user_id = user_data.get('userId')
    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    existing_user = users_collection.find_one({"userId": user_id})
    if existing_user:
        return jsonify({"error": "User already exists"}), 409
    new_user = {
        "userId": user_id,
        "events_registered": []
    }
    users_collection.insert_one(new_user)

    return jsonify({"message": "User created successfully!"}), 201

@app.route('/login_user', methods=['POST'])
def login_user():
    login_data = request.json
    user_id = login_data.get('userId')
    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    user = users_collection.find_one({"userId": user_id})
    if user:
        return jsonify({"message": f"User {user_id} logged in successfully!"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


@app.route('/<userId>/get_registered_events', methods=['GET'])
def get_registered_events(userId):
    user_id = userId
    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    user = users_collection.find_one({"userId": user_id})
    if user:
        return jsonify({"events_registered": user.get('events_registered', [])}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/<userId>/register_event', methods=['POST'])
def register_event(userId):
    request_data = request.json
    user_id = userId
    event_id = request_data.get('eventId')
    if not user_id or not event_id:
        return jsonify({"error": "userId and eventId are required"}), 400
    user = users_collection.find_one({"userId": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404
    event_details = events_collection.find_one({"_id": event_id})
    if not event_details:
        return jsonify({"error": "Event not found"}), 404
    
    registered_event = user.get('events_registered')
    event_start = datetime.strptime(event_details['start_time'], '%Y-%m-%d %H:%M:%S')
    event_end = datetime.strptime(event_details['end_time'], '%Y-%m-%d %H:%M:%S')

    for event in registered_event:
        if(event['_id'] == event_id):
            return jsonify({"error": "User has already registered for this event"}), 409
        
        reg_event_start = datetime.strptime(event['start_time'], '%Y-%m-%d %H:%M:%S')
        reg_event_end = datetime.strptime(event['end_time'], '%Y-%m-%d %H:%M:%S')

        if (event_start < reg_event_end and event_end > reg_event_start):
            return jsonify({
                "error": f"Event '{event_details['event_name']}' conflicts with already registered event '{event['event_name']}'"
            }), 409
        
    if len(registered_event) == 3:
        return jsonify({"error": "User already registered for 3 events cannot register above that"}), 409
    users_collection.update_one(
        {"userId": user_id},
        {"$push": {"events_registered": event_details}}
    )

    return jsonify({"message": "Registered for event {event_id} successfully!"}), 200
    
@app.route('/<userId>/unregister_event', methods=['POST'])
def unregister_event(userId):
    request_data = request.json
    user_id = userId
    event_id = request_data.get('eventId')
    if not user_id or not event_id:
        return jsonify({"error": "userId and eventId are required"}), 400
    user = users_collection.find_one({"userId": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404
    flag = 0
    for event in user.get('events_registered'):
        if(event['_id'] == event_id):
            users_collection.update_one(
                {"userId": user_id},
                {"$pull": {"events_registered": {"_id": event_id}}}
            )
            flag = 1
            break
    if(flag):
        return jsonify({"message": "Removed from event {event_id} successfully!"}), 200
    else:
        return jsonify({"error": "Event not registered for this user"}), 409
        
    

@app.route('/events', methods=['GET'])
def get_events():
    data = events_collection.find()
    events_list = []
    for doc in data:
        events_list.append(doc)
    return jsonify(events_list)

if __name__ == '__main__':
    app.run()