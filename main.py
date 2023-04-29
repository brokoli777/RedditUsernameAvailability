from flask import Flask, jsonify
from flask import request

app = Flask(__name__)

@app.route('/') # ‘https://www.google.com/‘

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

# app.run(port=5000)