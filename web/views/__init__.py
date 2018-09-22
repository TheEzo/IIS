from web.views import base
from web.views import home


def configure_views(app):
    home.configure(app)
    base.configure(app)
