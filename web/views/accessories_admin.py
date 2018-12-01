from flask.views import MethodView
from flask import render_template, request,jsonify
from web.core import db
from flask_login import current_user


class Accessories(MethodView):
    def get(self):
        return render_template('accessories_admin.html')


class AccessoriesAdmin(MethodView):

    def process_accessory(self,data):
        accessory = data[0]
        color = data[1]

        return dict(
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
            color=color.barva,
            )

    def post(self):
        accessories = db.get_accessories()
        accessories_data = []
        for accessory in accessories:
            accessories_data.append(self.process_accessory(accessory))
        args = request.form
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': args.get('length', '10'),
                'iTotalDisplayRecords': str(len(accessories)),
                'data': accessories_data
        })


def configure(app):
    app.add_url_rule('/accessories-admin',
                     view_func=Accessories.as_view('accessories-admin'))

    app.add_url_rule('/accessories-data',
                     view_func=AccessoriesAdmin.as_view('accessories-data'))