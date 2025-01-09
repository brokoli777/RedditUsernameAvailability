import time
from flask import Flask, request, jsonify
import praw
import prawcore
import requests
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


collectedData = ""
reddit = praw.Reddit(
    client_id = os.getenv("client_id"),
    client_secret = os.getenv("client_secret"),
    user_agent = os.getenv("user_agent"),
)

@app.route('/check', methods=['POST'])
def backend():
    collectedData = request.json['username']
    # Do something with the data
    response = 'available'
    print(response)

    try:
        user = reddit.redditor(collectedData)
        if hasattr(user,"is_suspended") and user.is_suspended:
            print(f"The username {user} is suspended")
            return "suspended"
    except prawcore.exceptions.NotFound:
        if reddit.username_available(collectedData):
                        # account doesn't exist
            print(f"FOUND:: The username {user} is available! <<<<<<<<<")
            return "available"
        else:
                        # account is deleted or shadowbanned for spam
            print(f"The username {user} is deleted or banned")
            return "deleted or banned"
    else:
                    # account exists
            print(f"The username {user} exists")
            return "not available"






