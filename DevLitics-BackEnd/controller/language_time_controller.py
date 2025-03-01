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


@app.route("/users/<int:user_id>", methods=["GET"])
def fetch_language_times(user_id):
    result = language_time_model.fetch_language_times(user_id)

    if not result:
        return jsonify({"error": "No language data found"}), 404

    combined_data = {
        "languages": [{"language_name": row["language_name"], "language_time": row["language_time"]} for row in result]
    }

    return jsonify(combined_data)


@app.route("/users/<int:user_id>", methods=["POST"])
def add_language_time(user_id):
    data = request.get_json()
    if not all(k in data for k in ("language_name", "language_time")):
        return jsonify({"error": "Missing required fields"}), 400

    success = language_time_model.add_language_time(user_id, data["language_name"], data["language_time"])
    return jsonify({"message": "Language time added successfully"}) if success else (jsonify({"error": "Failed to add language time"}), 500)

@app.route("/users/<int:user_id>", methods=["PUT"])
def update_language_time(user_id):
    data = request.get_json()
    if not all(k in data for k in ("language_name", "language_time")):
        return jsonify({"error": "Missing required fields"}), 400

    success = language_time_model.update_language_time(user_id, data["language_name"], data["language_time"])
    return jsonify({"message": "Language time updated successfully"}) if success else (jsonify({"error": "Failed to update language time"}), 500)

@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_language_time(user_id):
    data = request.get_json()
    if "language_name" not in data:
        return jsonify({"error": "Missing required field: language_name"}), 400

    success = language_time_model.delete_language_time(user_id, data["language_name"])
    return jsonify({"message": "Language time deleted successfully"}) if success else (jsonify({"error": "Failed to delete language time"}), 500)

@app.route("/users/<int:user_id>/total-time", methods=["GET"])
def get_total_coding_time(user_id):
    result = language_time_model.get_total_coding_time(user_id)
    return jsonify({"total_time": result}) if result else (jsonify({"error": "No coding time found"}), 404)