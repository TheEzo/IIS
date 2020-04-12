from flask import jsonify, request
from flask.views import MethodView
from flask_login import current_user
from web.roles import admin, admin_or_current
from web.core import db


class Users(MethodView):
    # @admin
    def get(self):
        data = [self.data_json(item) for item in db.get_users_data()]
        return jsonify(data)

    def post(self):
        data = dict(request.form)
        db_data = dict(
            rc=data.get('id'),
            email=data['email'],
            heslo=data.get('password'),
            jmeno=data['name'],
            prijmeni=data['surname'],
            ulice=data.get('address'),
            cislo_popisne=data.get('addr_num'),
            tel_cislo=data.get('tel_number'),
            clenstvi=data.get('membership'),
            pozice=data.get('position')
        )
        if 'id' in data and db.get_user_by_id(data.get('id')):
            db.update_users_data(**db_data)
            db.update_user(**db_data)
        else:
            db.create_user(**db_data)
        return '', 200

    @staticmethod
    def data_json(data):
        ret = dict(id=data.Osoba.rc,
                   name=data.Osoba.jmeno,
                   surname=data.Osoba.prijmeni,
                   email=data.Osoba.email,
                   city=data.Osoba.obec,
                   address=data.Osoba.ulice,
                   addr_num=data.Osoba.cislo_popisne,
                   tel_number=data.Osoba.tel_cislo)
        if hasattr(data, 'clenstvi'):
            ret.update({'membership': data.clenstvi})
        if hasattr(data, 'pozice'):
            ret.update({'position': data.pozice})
        return ret

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
    @admin_or_current
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
