from flask import render_template, jsonify
from flask.views import MethodView

from web.core import db


class ManageOrders(MethodView):
    def get(self):
        return render_template('orders_admin.html')

    def post(self):
        orders = db.get_all_orders()
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': '10',
                'iTotalDisplayRecords': str(len(orders)),
                'data': orders
        })

def configure(app):
    app.add_url_rule('/orders-admin',
                     view_func=ManageOrders.as_view('orders-admin'))
