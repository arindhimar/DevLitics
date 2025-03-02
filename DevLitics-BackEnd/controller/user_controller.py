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

@app.route("/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    
    if not all(k in data for k in ("username", "email")):
        return jsonify({"error": "Missing required fields"})
    
    if data['username'] == "" or data['email'] == "":
        return jsonify({"error": "Empty fields"})
    
    #if given then add them or else pass empty string
    if data['twitterHandle'] == "" or data['linkedinProfile'] == "":
        data['twitterHandle'] = ""
        data['linkedinProfile'] = ""
        
    
    result = user_model.update_user(user_id, data['username'], data['email'], data['twitterHandle'], data['linkedinProfile'])
    return jsonify({"message": "User updated successfully"} if result else {"error": "Failed to update user"}),200

@app.route("/", methods=["DELETE"])
def delete_user():
    data = request.get_json()
    result = user_model.delete_user(data['user_id'])
    return jsonify({"message": "User deleted successfully"} if result else {"error": "Failed to delete user"})

@app.route("/register", methods=["POST"]) 
def register():
    data = request.get_json()
    
    if not all(k in data for k in ("username", "email", "password")):
        return jsonify({"error": "Missing required fields"}), 400
    
    user_id = user_model.create_user(data['username'], data['email'], data['password'])
    
    return jsonify({"message": "User has been registered", "user_id": user_id}), 201  # Return user ID


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    
    if not all(k in data for k in ("email", "password")):
        return jsonify({"error": "Missing required fields"}), 400
    
    user = user_model.fetch_by_email(data['email'])
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if user['password'] != data['password']:
        return jsonify({"error": "Incorrect password"}), 401
    
    return jsonify({"message": "Login successful", "user_id": user['user_id']}), 200


@app.route("/validate", methods=["POST"])
def validate():
    data = request.get_json()
    
    if "user_id" not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    user = user_model.fetch_by_id(data['user_id'])
    
    if not user:
        return jsonify({"message": "false"}), 200
    
    return jsonify({"message": "true"}), 200