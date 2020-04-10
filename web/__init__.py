from flask import Flask, redirect, url_for, session, jsonify
from datetime import timedelta

from web.views import configure_views
from web.core.login import configure_login, User
from web.core.models import Osoba

from flask_login import LoginManager
import base64


def create_app():
    app = Flask(__name__, static_url_path='/static', static_folder='./static')
    #cors = CORS(app)
    app.secret_key = '#$secret_key%&'
    app.config['JSON_AS_ASCII'] = False

    configure_views(app)

    login_manager = LoginManager(app)
    configure_login(app)

    @login_manager.unauthorized_handler
    def unauthorized():
        return redirect(url_for('login'))

    @login_manager.request_loader
    def load_user_from_request(request):
        # first, try to login using the api_key url arg
        # todo: co to dela???
        api_key = request.args.get('api_key')
        if api_key:
            user = User.query.filter_by(api_key=api_key).first()
            if user:
                return user

        # next, try to login using Basic Auth
        api_key = request.headers.get('Authorization')
        if api_key:
            api_key = api_key.replace('Basic ', '', 1)
            try:
                api_key = base64.b64decode(api_key)
            except TypeError:
                pass
            user = User.query.filter_by(api_key=api_key).first()
            if user:
                return user

        # finally, return None if both methods did not login the user
        return User(None)

    @login_manager.user_loader
    def load_user(user_id):
        u = Osoba.query.filter_by(rc=user_id).first()
        if not u:
            return User(None)
        return User(u.rc, u.email, u.jmeno, u.prijmeni)

    @app.before_request
    def make_session_permanent():
        session.permanent = True
        app.permanent_session_lifetime = timedelta(minutes=30)

    @app.after_request
    def test(f):
        #for header in ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods']:
        #    f.headers.add(header, '*')
        f.headers.add('Access-Control-Allow-Credentials', 'true')
        f.headers.add('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization')
        f.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        f.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        return f

    return app
