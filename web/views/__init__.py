from web.views import base
from web.views import home
from web.views import order
from web.views import register
from web.views import profile
from web.views import costumes
from web.views import accessories
from web.views import orders


def configure_views(app):
    home.configure(app)
    base.configure(app)
    order.configure(app)
    register.configure(app)
    profile.configure(app)
    accessories.configure(app)
    costumes.configure(app)
    orders.configure(app)
