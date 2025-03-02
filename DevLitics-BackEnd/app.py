from flask import Flask
from flask_cors import CORS

# Import Blueprints from controllers
from controller.user_controller import app as user_app
from controller.language_time_controller import app as language_time_app
from controller.project_time_controller import app as project_time_app
from controller.github_controller import github_bp as github_app  # Import GitHub Blueprint
from controller.twitter_controller import twitter_bp as twitter_app  # Import Twitter Blueprint

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Register Blueprints with URL prefixes
app.register_blueprint(user_app, url_prefix="/user")
app.register_blueprint(language_time_app, url_prefix="/language_time")
app.register_blueprint(project_time_app, url_prefix="/project_time")
app.register_blueprint(github_app, url_prefix="/github")  # Register GitHub Blueprint
app.register_blueprint(twitter_app, url_prefix="/twitter")  # Register Twitter Blueprint

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)