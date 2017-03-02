from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

app = Flask(__name__)
app.secret_key = 'ajhbksaklhasjfsdklfjaklfjdslkfajlkfdsfsafasdfasfasdfa'

jwt = JWTManager(app)

@app.route('/login',methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if username != 'test' or password != 'test':
        return jsonify({"msg": "bad username or password"}), 401
    ret = {'access_token': create_access_token(identity={'username':username,'age':1,'hobbies':['movie','music']})}
    return jsonify(ret), 200

@app.route('/protected',methods=['GET'])
@jwt_required
def protected():
    current_user=get_jwt_identity()
    return jsonify(current_user),200


if __name__=='__main__':
    app.run()