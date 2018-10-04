from flask import render_template, jsonify, request
from flask.views import MethodView

from web.core import db


class Users(MethodView):
    def get(self):
        return render_template('users.html')


class UsersData(MethodView):
    def process_user(self, data):
        user = data[0]
        street = user.ulice if user.ulice else ''
        num = user.cislo_popisne if user.cislo_popisne else ''
        role = data[1] if data[1] else ''
        if role:
            role = 'Zaměstnanec' if role == 'zamestnanec' else 'Vedoucí'
        else:
            role = 'Zákazník'
        return dict(
            name=user.jmeno,
            surename=user.prijmeni,
            email=user.email,
            city=data[2] if data[2] else '  ',
            addr='%s %s' % (street, num),
            phone=user.tel_cislo if user.tel_cislo else '',
            role=role,
            action=render_template('users_action.html', rc=user.rc)
        )

    def post(self):
        users = db.get_users_data()
        user_data = []
        for user in users:
            user_data.append(self.process_user(user))
        args = request.form
        return jsonify({
            'sEcho': '1',
            'iDisplayLength': args.get('length', '10'),
            'iTotalDisplayRecords': str(len(users)),
            'data': user_data
        })


def configure(app):
    app.add_url_rule('/users',
                     view_func=Users.as_view('users'))
    app.add_url_rule('/users_data',
                     view_func=UsersData.as_view('users-data'))

    @app.route('/users_edit')
    def users_edit():
        pass

    @app.route('/users_delete')
    def users_delete():
        pass
