from flask import Flask, abort, url_for, request, make_response
app = Flask(__name__)

@app.route('/')
def hello_world():
    res=make_response('Hello, World!')
    res.set_cookie('username','xiao feifei')
    return res

@app.route('/api/v1/<user>')
def show_user(user):
    name=request.cookies.get('username')
    return 'user:%s, name:%s'%(user,name)

@app.route('/projects/')
def projects():
    app.logger.debug('A value for debugging!')
    app.logger.warning('A value for warning!')
    app.logger.error('A error occurred!')
    return 'The porject page'

@app.route('/about')
def about():
    return 'The about page'

with app.test_request_context():
    print(url_for('hello_world'))
    print(url_for('show_user',user='xiaozhouzi'))
    print(url_for('about',next='/'))
    print(url_for('static',filename='style.css'))

@app.route('/login',methods=['GET','POST'])
def login():
    if request.method=='POST':
        return 'do the login'
    else:
        return 'show the login form'
    

if __name__=="__main__":
    app.run()