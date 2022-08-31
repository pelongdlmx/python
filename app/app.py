
from wsgiref.validate import validator
from flask import Flask, render_template, request, url_for, redirect 
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm


# https://www.youtube.com/watch?v=0Qxtt4veJIc&list=PLCC34OHNcOtolz2Vd9ZSeSXWc8Bq23yEz&index=2


app = Flask(__name__)

# Add Database 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

db = SQLAlchemy(app)

# Create Model 
class Users(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False) 
    email = db.Column(db.String(120), nullable=False, unique=True) 
    date_added = db.Column(db.DateTime, default=datetime.utcnow) 

    # Create a String 
    def __repr__(self):
        return '<Name %r>' % self.name

class UserForm(FlaskForm): 
    name = StringField('Name', validator=[DataRequired()])
    email = StringField('Email', validator=[DataRequired()])
    submit = SubmitField('Submit')

@app.route('/index', methods=['POST', 'GET'])
def add_user(): 
    return render_template("add_user.html" )

@app.before_request
def before_request():
    print('antes de la peticion')

@app.after_request
def after_request(response):
    print('despues de la peticion')
    return response

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



@app.route("/contact/<name>")
def contact(name):
    data = {"title": "Contact", "name": name}
    return render_template("contact.html", data=data)

def query_string():
    print(request)
    print(request.args)
    print(request.args.get("param1"))
    return "Ok"

def page_not_found(error):
    # return render_template("404.html"), 404
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.add_url_rule("/query_string", view_func=query_string)
    app.register_error_handler(404, page_not_found)
    app.run(debug=True, port=5000)
