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
        orders, costumes, accessories = db.get_user_orders(current_user.get_id())
        order_data = []
        for order in orders:
            order_data.append(dict(
                action_name=order.nazev_akce,
                date_from=order.datum_vypujceni.strftime("%d.%m.%Y"),
                date_to=order.datum_vraceni.strftime("%d.%m.%Y"),
                costumes=', '.join([c.Kostym.nazev for c in costumes if c.VypujckaKostym.vypujcka_id == order.id]),
                accessories=', '.join([c.Doplnek.nazev for c in accessories if c.DoplnekVypujcka.vypujcka_id == order.id]),
                price='TBD', # TODO
                returned='Vráceno' if order.vracen else 'Nevráceno'
            ))
        args = request.form
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': args.get('length', '10'),
                'iTotalDisplayRecords': str(len(order_data)),
                'data': order_data
        })


def configure(app):
    app.add_url_rule('/orders',
                     view_func=Orders.as_view('orders'))

    app.add_url_rule('/orders_data',
                     view_func=OrdersView.as_view('orders-data'))