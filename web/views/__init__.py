from web.views import base
from web.views import home
from web.views import order
from web.views import register
from web.views import profile
from web.views import costumes
from web.views import accessories
from web.views import cart
from web.views import manage_orders
from web.views import users
from web.views import costumes_insert
from web.views import accessories_insert
from web.views import new_order
from web.views import orders
from web.views import property_insert
from web.views import costumes_admin
from web.views import accessories_admin


def configure_views(app):
    home.configure(app)
    base.configure(app)
    order.configure(app)
    register.configure(app)
    profile.configure(app)
    accessories.configure(app)
    costumes.configure(app)
    cart.configure(app)
    manage_orders.configure(app)
    users.configure(app)
    costumes_insert.configure(app)
    accessories_insert.configure(app)
    new_order.configure(app)
    orders.configure(app)
    property_insert.configure(app)
    costumes_admin.configure(app)
    accessories_admin.configure(app)
