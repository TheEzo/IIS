from web.views import base
from web.views import costumes
from web.views import accessories
from web.views import cart
from web.views import users
from web.views import orders_admin
from web.views import orders


def configure_views(app):
    base.configure(app)
    accessories.configure(app)
    costumes.configure(app)
    cart.configure(app)
    users.configure(app)
    orders_admin.configure(app)
    orders.configure(app)
