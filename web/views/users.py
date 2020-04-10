from flask import jsonify, request
from flask.views import MethodView
from flask_login import current_user
from web.roles import admin
from web.core import db


class Users(MethodView):
    @admin
    def get(self):
        data = [self.data_json(item) for item in db.get_users_data()]
        return jsonify(data)

    def post(self):
        ...

    @staticmethod
    def data_json(data):
        return dict(id=data.Osoba.rc,
                    name=data.Osoba.jmeno,
                    surname=data.Osoba.prijmeni,
                    email=data.Osoba.email,
                    city=data.Osoba.obec,
                    address=data.Osoba.ulice,
                    addr_num=data.Osoba.cislo_popisne,
                    tel_number=data.Osoba.tel_cislo,
                    membership=data.clenstvi,
                    position=data.pozice)

    @staticmethod
    @admin
    def delete(user_id):
        if db.get_user_by_id(user_id):
            db.delete_user(user_id)
            return '', 200
        return '', 400


def configure(app):
    app.add_url_rule('/users', view_func=Users.as_view('users'))

    @app.route('/users/<int:obj_id>', methods=['GET', 'DELETE'])
    def get_user(obj_id):
        if request.method == 'GET':
            data = db.get_user_by_id(obj_id)
            if data:
                return jsonify(Users.data_json(data))
            return '', 400
        if request.method == 'DELETE':
            if db.get_user_by_id(obj_id):
                return '', 200
            return '', 400
