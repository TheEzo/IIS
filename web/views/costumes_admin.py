from flask.views import MethodView
from flask import render_template, request,jsonify
from web.core import db
from flask_login import current_user
from web.roles import employee

class Costumes(MethodView):
    def get(self):
        return render_template('costumes_admin.html')


class CostumesAdmin(MethodView):
    @employee
    def process_costume(self,data):
        costume = data[0]
        color = data[1]
        use = data[2]

        return dict(
            name=costume.nazev,
            producer=costume.vyrobce,
            material=costume.material,
            description=costume.popis,
            size=costume.velikost,
            date_of_manufacture=costume.datum_vyroby,
            detrition=costume.opotrebeni,
            amount=costume.pocet,
            prize=costume.cena,
            color=color.barva,
            use=use.druh_akce
            )

    @employee
    def post(self):
        costumes = db.get_costumes()
        costumes_data = []
        for costume in costumes:
            costumes_data.append(self.process_costume(costume))
        args = request.form
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': args.get('length', '10'),
                'iTotalDisplayRecords': str(len(costumes)),
                'data': costumes_data
        })


def configure(app):
    app.add_url_rule('/costumes-admin',
                     view_func=Costumes.as_view('costumes-admin'))

    app.add_url_rule('/costumes-data',
                     view_func=CostumesAdmin.as_view('costumes-data'))