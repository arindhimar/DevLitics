from flask import request, jsonify, Blueprint
from models.github_model import GitHubModel

github_bp = Blueprint('github', __name__)
github_model = GitHubModel()

@github_bp.route("/", methods=["GET"])
def fetch_all_github_credentials():
    result = github_model.fetch_all_github_credentials()
    return jsonify(result)

@github_bp.route("/<int:user_id>", methods=["GET"])
def fetch_github_credentials(user_id):
    data = github_model.fetch_github_credentials_by_user_id(user_id)

    if not data:
        return jsonify({"github_token": "", "repos": [], "trackInterval": "daily"}), 200  # ✅ Return empty values if no data

    print(data)  # ✅ Debugging output

    # ✅ Convert list of dictionaries into structured repo data
    repos = [
        {
            "url": f"https://github.com/{row['repo_owner']}/{row['repo_name']}",
            "owner": row["repo_owner"],
            "repo": row["repo_name"]
        }
        for row in data  # ✅ Now data is always a list
    ]

    return jsonify({
        "github_token": data[0]["github_token"],  # ✅ Same token for all repos
        "repos": repos,
        "trackInterval": "daily"  # ✅ Adjust if necessary
    })


@github_bp.route("/<int:user_id>", methods=["POST"])
def create_github_credentials(user_id):
    print("Received Request:")
    data = request.get_json()
    print(data)

    if not all(k in data for k in ("github_token", "repos", "trackInterval")):
        print("Missing required fields")
        return jsonify({"error": "Missing required fields"}), 400

    github_token = data["github_token"]
    track_interval = data["trackInterval"]
    
    # Loop through the repos array and insert each repository
    for repo in data["repos"]:
        if "owner" in repo and "repo" in repo:
            success = github_model.create_github_credentials(
                user_id, github_token, repo["owner"], repo["repo"]
            )
        else:
            print("Invalid repo format:", repo)
            return jsonify({"error": "Invalid repo format"}), 400

    return jsonify({"message": "GitHub credentials created successfully"}), 201

@github_bp.route("/<int:user_id>", methods=["PUT"])
def update_github_credentials(user_id):
    data = request.get_json()
    if not all(k in data for k in ("github_token", "repo_owner", "repo_name")):
        return jsonify({"error": "Missing required fields"}), 400

    result = github_model.update_github_credentials(
        user_id, data['github_token'], data['repo_owner'], data['repo_name']
    )
    return jsonify({"message": "GitHub credentials updated successfully"}), 200

@github_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_github_credentials(user_id):
    result = github_model.delete_github_credentials(user_id)
    return jsonify({"message": "GitHub credentials deleted successfully"}), 200

@github_bp.route("/<int:user_id>/<string:repo_owner>/<string:repo_name>", methods=["DELETE"])
def delete_github_repo(user_id, repo_owner, repo_name):
    try:
        success = github_model.delete_github_repo(user_id, repo_owner, repo_name)

        if success:
            return jsonify({"message": "Repository deleted successfully"}), 200
        else:
            return jsonify({"error": "Repository not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
