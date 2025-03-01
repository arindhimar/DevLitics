
from flask import request, jsonify, Blueprint
from models.project_time import ProjectTimeModel

app = Blueprint('project_time', __name__)
project_time_model = ProjectTimeModel()

@app.route("/users/<int:user_id>", methods=["GET"])
def fetch_project_times(user_id):
    result = project_time_model.fetch_project_times(user_id)

    if not result:
        return jsonify({"error": "No project data found"}), 404

    combined_data = {
        "user_id": user_id,
        "projects": [{"project_name": row["project_name"], "project_time": row["project_time"]} for row in result]
    }

    return jsonify(combined_data)

@app.route("/users/<int:user_id>", methods=["POST"])
def add_project_time(user_id):
    data = request.get_json()
    if not all(k in data for k in ("project_name", "project_time")):
        return jsonify({"error": "Missing required fields"}), 400

    success = project_time_model.add_project_time(user_id, data["project_name"], data["project_time"])
    return jsonify({"message": "Project time added successfully"}) if success else (jsonify({"error": "Failed to add project time"}), 500)

@app.route("/users/<int:user_id>", methods=["PUT"])
def update_project_time(user_id):
    data = request.get_json()
    if not all(k in data for k in ("project_name", "project_time")):
        return jsonify({"error": "Missing required fields"}), 400

    success = project_time_model.update_project_time(user_id, data["project_name"], data["project_time"])
    return jsonify({"message": "Project time updated successfully"}) if success else (jsonify({"error": "Failed to update project time"}), 500)

@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_project_time(user_id):
    data = request.get_json()
    if "project_name" not in data:
        return jsonify({"error": "Missing required field: project_name"}), 400

    success = project_time_model.delete_project_time(user_id, data["project_name"])
    return jsonify({"message": "Project time deleted successfully"}) if success else (jsonify({"error": "Failed to delete project time"}), 500)

@app.route("/users/<int:user_id>/total-project-time", methods=["GET"])
def get_total_project_time(user_id):
    result = project_time_model.get_total_project_time(user_id)
    return jsonify({"total_project_time": result}) if result else (jsonify({"error": "No project time found"}), 404)
