from flask import request, jsonify, Blueprint
from models.twitter_model import TwitterModel

twitter_bp = Blueprint('twitter', __name__)
twitter_model = TwitterModel()

@twitter_bp.route("/", methods=["GET"])
def fetch_all_twitter_credentials():
    result = twitter_model.fetch_all_twitter_credentials()
    return jsonify(result)

@twitter_bp.route("/<int:user_id>", methods=["GET"])
def fetch_twitter_credentials_by_user_id(user_id):
    result = twitter_model.fetch_twitter_credentials_by_user_id(user_id)
    if result:
        return jsonify(result)
    else:
        return jsonify({}), 200

@twitter_bp.route("/<int:user_id>", methods=["POST"])
def create_twitter_credentials(user_id):
    data = request.get_json()
    if not all(k in data for k in ("bearer_token", "consumer_key", "consumer_secret", "access_token", "access_token_secret")):
        return jsonify({"error": "Missing required fields"}), 400
    
    if data['bearer_token'] == "" or data['consumer_key'] == "" or data['consumer_secret'] == "" or data['access_token'] == "" or data['access_token_secret'] == "":
        return jsonify({"error": "Empty fields"}), 200

    result = twitter_model.create_twitter_credentials(
        user_id, data['bearer_token'], data['consumer_key'], data['consumer_secret'], data['access_token'], data['access_token_secret'], data.get('post_frequency', 24), data.get('auto_post_enabled', False)
    )
    return jsonify({"message": "Twitter credentials created successfully"}), 201

@twitter_bp.route("/<int:user_id>", methods=["PUT"])
def update_twitter_credentials(user_id):
    data = request.get_json()
    if not all(k in data for k in ("bearer_token", "consumer_key", "consumer_secret", "access_token", "access_token_secret")):
        return jsonify({"error": "Missing required fields"}), 400

    result = twitter_model.update_twitter_credentials(
        user_id, data['bearer_token'], data['consumer_key'], data['consumer_secret'], data['access_token'], data['access_token_secret'], data.get('post_frequency', 24), data.get('auto_post_enabled', False)
    )
    return jsonify({"message": "Twitter credentials updated successfully"}), 200

@twitter_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_twitter_credentials(user_id):
    result = twitter_model.delete_twitter_credentials(user_id)
    return jsonify({"message": "Twitter credentials deleted successfully"}), 200