from flask.views import MethodView
from flask import render_template, request, jsonify
from web.core import db
from flask_login import current_user
from web.roles import login_required
from web.views.users import Users


class UserOrders(MethodView):
    # @login_required
    def get(self):
        user_id = current_user.id
        v, k, d = db.get_user_orders(int(user_id))
        data = [UserOrders.data_json(item, k, d) for item in v]
        return jsonify(data)

    @staticmethod
    def data_json(v, k, d):
        costumes = [c for c in k if c.VypujckaKostym.vypujcka_id == v.Vypujcka.id]
        accessories = [a for a in d if a.DoplnekVypujcka.vypujcka_id == v.Vypujcka.id]
        days = (v.Vypujcka.datum_vraceni - v.Vypujcka.datum_vypujceni).days
        return dict(
            id=v.Vypujcka.id,
            costumes=', '.join([f'{item.Kostym.nazev} ({item.Kostym.velikost})' for item in costumes]),
            accessories=', '.join([f'{item.Doplnek.nazev} ({item.Doplnek.velikost})' for item in accessories]),
            date_from=str(v.Vypujcka.datum_vypujceni),
            date_to=str(v.Vypujcka.datum_vraceni),
            user=Users.data_json(v),
            returned=bool(v.Vypujcka.vracen),
            approved_by=v.Vypujcka.zamestnanec,
            price=sum([c.Kostym.cena for c in costumes] + [a.Doplnek.cena for a in accessories]) * days,
            name=v.Vypujcka.nazev_akce
        )


def configure(app):
    app.add_url_rule('/orders', view_func=UserOrders.as_view('orders'))

    @app.route('/orders/<int:obj_id>', methods=['GET', 'POST'])
    def get_orders(obj_id):
        if request.method == 'GET':
            v, k, d = db.get_all_orders()
            data = next((item for item in v if item.Vypujcka.id == obj_id), None)
            if data:
                return jsonify(UserOrders.data_json(data, k, d))
            return '', 400
