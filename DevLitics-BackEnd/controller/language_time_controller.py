from flask import request, jsonify, Blueprint
from models.language_time import LanguageTimeModel

app = Blueprint('language_time', __name__)

language_time_model = LanguageTimeModel()

# @app.route("/", methods=["GET"])
# def fetch_language_times():
#     user_id = request.args.get("user_id")
#     result = language_time_model.fetch_language_times(user_id)
#     return jsonify(result)

# @app.route("/", methods=["POST"])
# def add_language_time():
#     data = request.get_json()
#     result = language_time_model.add_language_time(data['user_id'], data['language_name'], data['language_time'])
#     return jsonify({"message": "Language time added successfully"} if result else {"error": "Failed to add language time"})

# @app.route("/", methods=["PUT"])
# def update_language_time():
#     data = request.get_json()
#     result = language_time_model.update_language_time(data['user_id'], data['language_name'], data['language_time'])
#     return jsonify({"message": "Language time updated successfully"} if result else {"error": "Failed to update language time"})

# @app.route("/", methods=["DELETE"])
# def delete_language_time():
#     data = request.get_json()
#     result = language_time_model.delete_language_time(data['user_id'], data['language_name'])
#     return jsonify({"message": "Language time deleted successfully"} if result else {"error": "Failed to delete language time"})


@app.route("/", methods=["GET"])
def fetch_all_language_times():
    result = language_time_model.fetch_all_language_times()

    if not result:
        return jsonify({"error": "No language data found"}), 404

    combined_data = {}

    for row in result:
        user_id = str(row["user_id"]) 
        username = row["username"]

        if user_id not in combined_data:
            combined_data[user_id] = {
                "username": username,
                "languages": []
            }
        
        combined_data[user_id]["languages"].append({row["language_name"]: row["language_time"]})

    return jsonify(combined_data)


@app.route("/users/<int:user_id>", methods=["GET"])
def fetch_language_times(user_id):
    result = language_time_model.fetch_language_times(user_id)

    if not result:
        return jsonify([]), 200

    username = result[0]["username"] if result else None

    combined_data = {
        "username": username,
        "languages": [
            {"language_name": row["language_name"], "language_time": row["language_time"]}
            for row in result
        ]
    }

    return jsonify(combined_data)



@app.route("/users/<int:user_id>", methods=["POST"])
def add_language_time(user_id):
    data = request.get_json()
    
    if not isinstance(data, list):
        return jsonify({"error": "Request body must be a list of language objects"}), 400

    for entry in data:
        if not all(k in entry for k in ("language_name", "language_time")):
            return jsonify({"error": "Missing required fields in one or more objects"}), 400

    success_count = 0
    for entry in data:
        success = language_time_model.add_language_time(user_id, entry["language_name"], entry["language_time"])
        if success:
            success_count += 1

    if success_count == len(data):
        return jsonify({"message": "All language times added successfully"})
    elif success_count > 0:
        return jsonify({"message": f"{success_count} out of {len(data)} language times added successfully"}), 207
    else:
        return jsonify({"error": "Failed to add any language time"}), 500

@app.route("/users/<int:user_id>", methods=["PUT"])
def update_language_time(user_id):
    data = request.get_json()
    if not all(k in data for k in ("language_name", "language_time")):
        return jsonify({"error": "Missing required fields"}), 400

    success = language_time_model.update_language_time(user_id, data["language_name"], data["language_time"])
    return jsonify({"message": "Language time updated successfully"}) if success else (jsonify({"error": "Failed to update language time"}), 500)

@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_language_time(user_id):
    success = language_time_model.delete_by_user_id(user_id, )
    return jsonify({"message": "Language time deleted successfully"}) if success else (jsonify({"error": "Failed to delete language time"}), 500)

@app.route("users/deleteall", methods=["DELETE"])
def delete_all_language_times():
    success = language_time_model.delete_all_language_times()
    return jsonify({"message": "All language times deleted successfully"}) if success else (jsonify({"error": "Failed to delete language times"}), 500)

@app.route("/users/<int:user_id>/total-time", methods=["GET"])
def get_total_coding_time(user_id):
    result = language_time_model.get_total_coding_time(user_id)
    return jsonify({"total_time": result}) if result else (jsonify({"error": "No coding time found"}), 404)