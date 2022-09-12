from flask import Flask,  url_for, redirect, session, request
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from model import db, Users

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
server_session = Session(app)
db.init_app(app)

with app.app_context(): 
    db.create_all()
 
@app.route("/user", methods=["POST", "GET"])
def show_users():
    user_id = session.get("user_id")

    if not user_id: 
        data = {"error": "Unauthorized"}
        return data, 401

    user = Users.query.filter_by(id=user_id).first()
    data = {
        "id": user.id, 
        "email": user.email
        }
    return data

    our_users = Users.query.order_by(Users.date_added)

    # print("ADD_USER:", our_users)
    # data = {"users": our_users}
    data = {"users": "USER SHOULD BE HERE"}
    # return render_template("add_user.html", our_users=our_users)
    return data
 
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
    # return render_template("index.html", data=data)
    return data

@app.route("/login", methods=["POST"])
def login_user():

    # request_data = request.get_json()
    # password = request_data["password"]
    # userEmail = request_data["email"]
    email = request.json['email']
    password = request.json['password']
    

    # userPassDB = Users.query.filter_by(password_hash=password).first()

    user = Users.query.filter_by(email=email).first()

    if user is None :
        data = {
            "error": "Unauthorized",
        }
        return data, 401

    if not bcrypt.check_password_hash(user.password_hash, password): 
        data = {
            "error": "Unauthorized",
        }
        return  data, 401

    session['user_id'] = user.id

    data = {
        "id": user.id, 
        "email": user.email
        }
    return data, 200

@app.route('/logout',  methods=["POST"])
def logout_user(): 
    session.pop('user_id')
    return "200"


@app.route("/register", methods=["POST" ])
def register_user():
    if request.method == "POST":
        request_data = request.get_json()
        name = request_data["name"]
        user = request_data["user"]
        email = request_data["email"]
        password = request_data["password"]
        
        userEmailDB = Users.query.filter_by(email=email).first()
        userNameDB = Users.query.filter_by(username=user).first()

        if userEmailDB is None and userNameDB is None:
            pw_hash  =  bcrypt.generate_password_hash(password)
            new_user = Users(
                username=user, name=name, email=email, password_hash=pw_hash 
            )
            db.session.add(new_user)
            db.session.commit()
            data = {
                "id": new_user.id, 
                "email": new_user.email
                }
            return data
        else:
            data = {
                "response": "Error, user already exists",
            }
            return data
 
def page_not_found(error):
    # return render_template("404.html"), 404
    return redirect(url_for("index"))

if __name__ == "__main__":
    # app.add_url_rule("/query_string", view_func=query_string)
    app.register_error_handler(404, page_not_found)
    app.run(debug=True, port=5000)
