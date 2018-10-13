from flask import render_template, jsonify, request, flash, redirect, url_for
from flask.views import MethodView
from flask_login import current_user
from web.roles import admin
from web.core import db


class Users(MethodView):
    @admin
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
        membership = data[3]
        if membership == 'zlate':
            membership = 'Zlaté'
        elif membership == 'stribrne':
            membership = 'Stříbrné'
        else:
            membership = 'Bronzové'
        return dict(
            name=user.jmeno,
            surename=user.prijmeni,
            email=user.email,
            city=data[2] if data[2] else '  ',
            addr='%s %s' % (street, num),
            phone=user.tel_cislo if user.tel_cislo else '',
            membership=membership,
            role=role,
            action=render_template('users_action.html', rc=user.rc),
            rc=user.rc
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

    @app.route('/users_edit', methods=['POST'])
    @admin
    def users_edit():
        data = request.form
        if current_user.get_id() == data['rc']:
            flash('Editace vlastní pozice není dovolena', 'alert-warning')
        else:
            db.update_user(**data)
            flash('Uživatel aktualizován', 'alert-success')
        return jsonify({})

    @app.route('/users_delete')
    @admin
    def users_delete():
        rc = request.args.get('id')
        db.delete_user(rc)
        flash('Uživatel úspěšně smazám', 'alert-success')
        return redirect(url_for('users'))
