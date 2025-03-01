from flask import Flask
from controller.user_controller import app as user_app
from controller.language_time_controller import app as language_time_app


app = Flask(__name__)

app.register_blueprint(user_app, url_prefix="/user")
app.register_blueprint(language_time_app, url_prefix="/language_time")


if __name__ == "__main__":
    app.run(debug=True)
