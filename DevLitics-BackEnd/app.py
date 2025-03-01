from flask import Flask
from controller.user_controller import app as user_app
from controller.language_time_controller import app as language_time_app
from controller.project_time_controller import app as project_time_app
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.register_blueprint(user_app, url_prefix="/user")
app.register_blueprint(language_time_app, url_prefix="/language_time")
app.register_blueprint(project_time_app, url_prefix="/project_time")

if __name__ == "__main__":
    app.run(debug=True)
