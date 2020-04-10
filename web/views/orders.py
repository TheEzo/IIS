from flask.views import MethodView
from flask import render_template, request, jsonify
from web.core import db
from flask_login import current_user
from web.roles import login_required
from web.views.users import Users


class UserOrders(MethodView):
    # @login_required
    def get(self):
        user_id = 9609255832
        v, k, d = db.get_user_orders(user_id)
        data = [UserOrders.data_json(item, k, d) for item in v]
        return jsonify(data)

    def post(self):
        ...

    @staticmethod
    def data_json(v, k, d):
        return dict(
            id=v.id,
            costumes=[f'{item.Kostym.nazev} ({item.Kostym.velikost})' for item in k
                      if item.VypujckaKostym.vypujcka_id == v.id],
            accessories=[f'{item.Doplnek.nazev} ({item.Doplnek.velikost})' for item in d
                         if item.DoplnekVypujcka.vypujcka_id == v.id],
            date_from=str(v.datum_vypujceni),
            date_to=str(v.datum_vraceni),
            user=Users.data_json(v)
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
        if request.method == 'DELETE':
            ...
