from flask.views import MethodView
from flask import render_template, request,jsonify
from web.core import db
from flask_login import current_user
from web.roles import login_required


class Orders(MethodView):
    @login_required
    def get(self):
        return render_template('orders.html')


class OrdersView(MethodView):
    @login_required
    def post(self):
        orders = db.get_user_orders(current_user.get_id())
        order_data = []
        for order in orders:
            data = dict(
            action_name = order.nazev_akce,
            date = order.datum_vypujceni.strftime("%d.%m.%Y"),
            returned = order.vracen
            )
            order_data.append(data)
        args = request.form
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': args.get('length', '10'),
                'iTotalDisplayRecords': str(len(orders)),
                'data': order_data
        })


def configure(app):
    app.add_url_rule('/orders',
                     view_func=Orders.as_view('orders'))

    app.add_url_rule('/orders_data',
                     view_func=OrdersView.as_view('orders-data'))