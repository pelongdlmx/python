from ast import IsNot
from wsgiref.validate import validator
from flask import Flask, render_template, request, url_for, redirect, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm
from flask_session import Session


# https://www.youtube.com/watch?v=0Qxtt4veJIc&list=PLCC34OHNcOtolz2Vd9ZSeSXWc8Bq23yEz&index=2


app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Add Database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"

app.config["SECRET_KEY"] = "my super secret key that no one is supposed to know"

db = SQLAlchemy(app)

# Create Model
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), nullable=False, unique=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(128))
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    # Create a String
    def __repr__(self):
        return "<Name %r>" % self.name


class UserForm(FlaskForm):
    name = StringField("Name", validator=[DataRequired()])
    email = StringField("Email", validator=[DataRequired()])
    submit = SubmitField("Submit")


@app.route("/user", methods=["POST", "GET"])
def add_user():
    # name = None
    # if name is None:
    #     user = Users(username='peloneee', name='Diego', email='diegohumberaato33@gmail.com', password_hash='Test123')
    #     db.session.add(user)
    #     db.session.commit()

    our_users = Users.query.order_by(Users.date_added)

    # print("ADD_USER:", our_users)
    # data = {"users": our_users}
    data = {"users": "USER SHOULD BE HERE"}
    # return render_template("add_user.html", our_users=our_users)
    return data


# @app.before_request
# def before_request():
#     print("antes de la peticion")


# @app.after_request
# def after_request(response):
#     print("despues de la peticion")
#     return response


@app.route("/")
def index():
    # return "hello there diego"
    cursos = ["php", "JS", "React", "Css", "Sass", "Html"]
    data = {
        "title": "Index page",
        "message": "Hello there",
        "cursos": cursos,
        "cursos_total": len(cursos),
    }
    return render_template("index.html", data=data)


@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        request_data = request.get_json()
        password = request_data["user_pass"]
        userEmail = request_data["user_email"]
        userPassDB = Users.query.filter_by(password_hash=password).first()
        userEmailDB = Users.query.filter_by(email=userEmail).first()

        if userPassDB is None and userEmailDB is None:
            print(userPassDB, userEmailDB)
            data = {
                "login": False,
                "user": True if userEmailDB else False,
                "password": True if userPassDB else False,
            }
            return data
        else:
            data = {
                "login": True,
            }
            # add_user()
            return data


@app.route("/sign-in", methods=["POST", "GET"])
def sig_in():
    if request.method == "POST":
        request_data = request.get_json()
        name = request_data["name"]
        userName = request_data["user_name"]
        user_email = request_data["user_email"]
        user_pass = request_data["user_pass"]
        userEmailDB = Users.query.filter_by(email=user_email).first()
        userNameDB = Users.query.filter_by(username=userName).first()

        if userEmailDB is None and userNameDB is None:
            user = Users(
                username=userName, name=name, email=user_email, password_hash=user_pass
            )
            db.session.add(user)
            db.session.commit()
            data = {"response": "Success"}
            return redirect("/")
            # return data
        else:
            print(userEmailDB, userNameDB)
            data = {
                "response": "Failed",
                "userEmailExists": True if userEmailDB else False,
                "userNameExists": True if userNameDB else False,
            }
            return data

    data = {"title": "Contact", "name": userName}

    return data


def query_string():
    print(request)
    print(request.args)
    print(request.args.get("param1"))
    return "Ok"


def page_not_found(error):
    # return render_template("404.html"), 404
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.add_url_rule("/query_string", view_func=query_string)
    app.register_error_handler(404, page_not_found)
    app.run(debug=True, port=5000)
