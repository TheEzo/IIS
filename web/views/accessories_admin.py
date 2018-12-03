from flask.views import MethodView
from flask import render_template, request, jsonify, flash, redirect, url_for
from web.core import db
from web.roles import employee
from flask_login import current_user


class Accessories(MethodView):
    def get(self):
        return render_template('accessories_admin.html')


class AccessoriesAdmin(MethodView):
    @employee
    def post(self):
        accessories = db.get_accessories_data()
        accessories_data = []
        for accessory in accessories:
            accessories_data.append(dict(
                name=accessory.nazev,
                producer=accessory.vyrobce,
                material=accessory.material,
                description=accessory.popis_vyuziti,
                type=accessory.typ,
                size=accessory.velikost,
                date_of_manufacture=accessory.datum_vyroby,
                detrition=accessory.opotrebeni,
                amount=accessory.pocet,
                prize=accessory.cena,
                color=accessory.barva,
                action=render_template('update_actions.html', update_url='accessories-insert', id_=accessory.id,
                                       delete_url='accessory-delete')
            ))
        args = request.form
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': args.get('length', '10'),
                'iTotalDisplayRecords': str(len(accessories)),
                'data': accessories_data
        })


class AccesoryDel(MethodView):
    def get(self):
        db.delete_accessory(request.args.get('id'))
        flash('Doplněk úspěšně smazán', 'alert-success')
        return redirect(url_for('accessories-admin'))


def configure(app):
    app.add_url_rule('/accessories-admin',
                     view_func=Accessories.as_view('accessories-admin'))

    app.add_url_rule('/accessories-data',
                     view_func=AccessoriesAdmin.as_view('accessories-data'))

    app.add_url_rule('/accessory-delete',
                     view_func=AccesoryDel.as_view('accessory-delete'))