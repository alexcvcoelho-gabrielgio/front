from flask import Flask, render_template, request, jsonify
import requests
import json

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/session', methods=['POST'])
def get_session():
    url = 'http://gabrielgio.com.br:3000/api/session'
    headers = {'content-type': 'application/json'}
    payload = {
        'brand': request.form['brand'],
        'model': request.form['model'],
        'hd-id': request.form['hd-id'],
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    return jsonify(response.json())

@app.route('/session/<string:session_id>', methods=['GET'])
def fectch_session(session_id):
    url = 'http://gabrielgio.com.br:3003/api/?id='+session_id
    headers = {'content-type': 'application/json'}
    response = requests.post(url, headers=headers)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run()
