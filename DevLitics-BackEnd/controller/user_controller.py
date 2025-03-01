from flask import request, jsonify, Blueprint
from models.user_model import UserModel

app = Blueprint('user', __name__)
user_model = UserModel()  

@app.route("/", methods=["GET"])
def fetch_all_users():
    result = user_model.fetch_all_users()
    return jsonify(result)

@app.route("/<int:userid>", methods=["GET"])
def fetch_by_id(userid):
    result = user_model.fetch_by_id(userid)
    return jsonify(result)

@app.route("/", methods=["POST"])
def create_user():
    data = request.get_json()
    result = user_model.create_user(data['username'], data['email'], data['password'])
    return jsonify({"message": "User created successfully"} if result else {"error": "Failed to create user"})
@app.route("/", methods=["PUT"])
def update_user():
    data = request.get_json()
    result = user_model.update_user(data['userid'], data['username'], data['email'], data['password'])
    return jsonify({"message": "User updated successfully"} if result else {"error": "Failed to update user"})

@app.route("/", methods=["DELETE"])
def delete_user():
    data = request.get_json()
    result = user_model.delete_user(data['userid'])
    return jsonify({"message": "User deleted successfully"} if result else {"error": "Failed to delete user"})
