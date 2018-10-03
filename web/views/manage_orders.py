from flask import render_template
from flask.views import MethodView


class ManageOrders(MethodView):
    def get(self):
        return render_template('orders_admin.html')


def configure(app):
    app.add_url_rule('/orders-admin',
                     view_func=ManageOrders.as_view('orders-admin'))
