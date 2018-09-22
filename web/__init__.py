from flask import Flask
from web.views import configure_views


def create_app():
    app = Flask(__name__, static_url_path='/static', static_folder='./static')
    app.secret_key = '#$secret_key%&'

    configure_views(app)

    return app
