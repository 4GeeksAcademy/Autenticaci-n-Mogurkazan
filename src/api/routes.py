"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
import datetime
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    email = data['email']
    password = data['password']
    is_active = True

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "User already exists"}), 400

    new_user = User(email=email, password=password, is_active=is_active)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity={'email': new_user.email}, expires_delta=datetime.timedelta(days=1))

    return jsonify({"access_token": access_token}), 201

###### Login ########
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity={'email': user.email}, expires_delta=datetime.timedelta(days=1))
    return jsonify({"access_token": access_token}), 200

###### Logout ########
@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200