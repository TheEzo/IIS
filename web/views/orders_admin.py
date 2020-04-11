from flask.views import MethodView
from flask import render_template, request,jsonify
from web.core import db
from flask_login import current_user
from web.roles import login_required
from web.views.users import Users


class Orders(MethodView):
    # @login_required
    def get(self):
        v, k, d = db.get_all_orders()
        data = [Orders.data_json(item, k, d) for item in v]
        return jsonify(data)

    def post(self):
        ...

    @staticmethod
    def data_json(v, k, d):
        costumes = [c for c in k if c.VypujckaKostym.vypujcka_id == v.Vypujcka.id]
        accessories = [a for a in d if a.DoplnekVypujcka.vypujcka_id == v.Vypujcka.id]
        days = (v.Vypujcka.datum_vraceni - v.Vypujcka.datum_vypujceni).days
        return dict(
            id=v.Vypujcka.id,
            costumes=[f'{item.Kostym.nazev} ({item.Kostym.velikost})' for item in costumes],
            accessories=[f'{item.Doplnek.nazev} ({item.Doplnek.velikost})' for item in accessories],
            date_from=str(v.Vypujcka.datum_vypujceni),
            date_to=str(v.Vypujcka.datum_vraceni),
            user=Users.data_json(v),
            returned=bool(v.Vypujcka.vracen),
            approved_by=v.Vypujcka.zamestnanec,
            price=sum([c.Kostym.cena for c in costumes] + [a.Doplnek.cena for a in accessories]) * days,
            name=v.Vypujcka.nazev_akce
        )


class OrdersView(MethodView):
    @login_required
    def post(self):
        orders, costumes, accessories = db.get_user_orders(current_user.get_id())
        order_data = []
        for order in orders:
            price = sum([c.Kostym.cena * c.VypujckaKostym.pocet for c in costumes
                         if c.VypujckaKostym.vypujcka_id == order.id])
            price += sum([a.Doplnek.cena * a.DoplnekVypujcka.pocet for a in accessories
                          if a.DoplnekVypujcka.vypujcka_id == order.id])
            order_data.append(dict(
                action_name=order.nazev_akce,
                date_from=order.datum_vypujceni.strftime("%d.%m.%Y"),
                date_to=order.datum_vraceni.strftime("%d.%m.%Y"),
                costumes=', '.join(['%s (%sx)' % (c.Kostym.nazev, c.VypujckaKostym.pocet) for c in costumes
                                    if c.VypujckaKostym.vypujcka_id == order.id]),
                accessories=', '.join(['%s (%sx)' % (c.Doplnek.nazev, c.DoplnekVypujcka.pocet) for c in accessories
                                       if c.DoplnekVypujcka.vypujcka_id == order.id]),
                price=str(price),
                returned=order.vracen
            ))
        args = request.form
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': args.get('length', '10'),
                'iTotalDisplayRecords': str(len(order_data)),
                'data': order_data
        })


def configure(app):
    app.add_url_rule('/orders_admin', view_func=Orders.as_view('orders_admin'))

    @app.route('/orders_admin/<int:obj_id>', methods=['GET', 'POST'])
    def get_orders_admin(obj_id):
        if request.method == 'GET':
            v, k, d = db.get_all_orders()
            data = next((item for item in v if item.Vypujcka.id == obj_id), None)
            if data:
                return jsonify(Orders.data_json(data, k, d))
            return '', 400
        if request.method == 'DELETE':
            ...