from flask import Flask, render_template, redirect, url_for, request, Blueprint
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm 
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from flask_sqlalchemy  import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from marshmallow import Schema, fields, pre_load, validate
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource

app = Flask(__name__)

app.config['SECRET_KEY'] = 'Thisissupposedtobesecret!'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://///Users/user/Desktop/crypto/database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

bootstrap = Bootstrap(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

api_bp = Blueprint('api', __name__)
api = Api(api_bp)
app.register_blueprint(api_bp, url_prefix='/api')

#Model
class User(UserMixin, db.Model):
   __tablename__ = 'user' 
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(20),unique=True)
   mobile = db.Column(db.String(10), unique=True)
   country = db.Column(db.String(15))
   email = db.Column(db.String(50), unique=True)
   username = db.Column(db.String(15), unique=True)
   password = db.Column(db.String(80))
   btc = db.Column(db.Integer)
   eth = db.Column(db.Integer)
   eos = db.Column(db.Integer)
   bch = db.Column(db.Integer)
   etc = db.Column(db.Integer)
   
   
   def __init__(self, name, mobile, country, email, username, password, btc=0, eth=0, eos=0, bch=0, etc=0):
       self.name = name
       self.mobile = mobile
       self.country = country
       self.email = email
       self.username = username
       self.password = password
       self.btc = btc
       self.eth = eth
       self.eos = eos
       self.bch = bch
       self.etc = etc

class UserSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String(required=True)
    mobile = fields.String(required=True)
    country = fields.String(required=True)
    email = fields.String(required=True)
    username = fields.String(required=True)
    btc = fields.Integer()
    eth = fields.Integer()
    eos = fields.Integer()
    bch = fields.Integer()
    etc = fields.Integer()

userprofile_schema = UserSchema(many=True)
user_schema = UserSchema()

class ProfileResource(Resource):
    def get(self):
        userprofile = User.query.all()
        userprofile = userprofile_schema.dump(userprofile).data
        return {'status': 'success', 'data': userprofile}, 200    

api.add_resource(ProfileResource, '/profile')     

@login_manager.user_loader
def load_user(user_id):
   return User.query.get(int(user_id))

class LoginForm(FlaskForm):
   username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
   password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])
   remember = BooleanField('remember me')

class RegisterForm(FlaskForm):
   name = StringField('name', validators=[InputRequired(), Length(min=5, max=20)])
   mobile = StringField('mobile', validators=[InputRequired(), Length(max=10)])
   country = StringField('country', validators=[InputRequired(), Length(min=8, max=15)])
   email = StringField('email', validators=[InputRequired(), Email(message='Invalid email'), Length(max=50)])
   username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
   password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])
   
@app.route('/')
def index():
   return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
   form = LoginForm()

   if form.validate_on_submit():
       user = User.query.filter_by(username=form.username.data).first()
       if user:
           if check_password_hash(user.password, form.password.data):
               login_user(user, remember=form.remember.data)
               return redirect(url_for('dashboard'))

       return '<h1>Invalid username or password</h1>'
       #return '<h1>' + form.username.data + ' ' + form.password.data + '</h1>'

   return render_template('login.html', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
   form = RegisterForm()

   if form.validate_on_submit():
       hashed_password = generate_password_hash(form.password.data, method='sha256')
       new_user = User(name=form.name.data, mobile=form.mobile.data, country=form.country.data, email=form.email.data, username=form.username.data, password=hashed_password)
       db.session.add(new_user)
       db.session.commit()

       return '<h1>New user has been created!</h1>'
       #return '<h1>' + form.username.data + ' ' + form.email.data + ' ' + form.password.data + '</h1>'

   return render_template('signup.html', form=form)

@app.route('/dashboard')
@login_required
def dashboard():
   return render_template('dashboard.html', name=current_user.username)

@app.route('/logout')
@login_required
def logout():
   logout_user()
   return redirect(url_for('index'))

if __name__ == '__main__':
   app.run(debug=True)