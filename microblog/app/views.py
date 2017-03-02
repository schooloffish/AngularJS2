from app import app, db, lm, oid
from flask import render_template,flash, redirect,url_for,session, request, g
from flask_login import login_user, logout_user, current_user, login_required
from .forms import LoginForm
from .models import User,Post
from app import lm

@app.route('/')
@app.route('/index')
def index():
    user= {'nickname':'Miguel'}
    posts = [ # fake array of posts
        {
            'author': { 'nickname': 'John' },
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': { 'nickname': 'Susan' },
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template("index.html",title='Home',user=user,posts=posts)

@app.route('/login',methods=['GET','POST'])
@oid.loginhandler
def login():
    if g.user is not None and g.user.is_authenticated():
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for OpenId="%s", remember_me=%s'% (form.openid.data,form.remember_me.data))
        return redirect('/index')
    return render_template('login.html',title='Sign In',form=form,providers=app.config['OPENID_PROVIDERS'])

def after_login(resp):
    if resp.email is None or resp.email=="":
        flash('Invalid login. Please try again.')
        return redirect(url_for('login'))
    user= User.query.filter_by(email=resp.email).first()
    if user is None:
        nickname=resp.nickname

@lm.user_loader
def load_user(id):
    return User.query.get(int(id))
