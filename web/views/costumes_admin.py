from flask.views import MethodView
from flask import render_template, request, jsonify, redirect, url_for, flash
from web.core import db
from flask_login import current_user
from web.roles import employee

class Costumes(MethodView):
    def get(self):
        return render_template('costumes_admin.html')


class CostumesAdmin(MethodView):
    @employee
    def post(self):
        costumes, colors = db.get_costumes_data()
        costumes_data = []
        for costume in costumes:
            costumes_data.append(dict(
                name=costume.nazev,
                producer=costume.vyrobce,
                material=costume.material,
                description=costume.popis,
                size=costume.velikost,
                date_of_manufacture=costume.datum_vyroby,
                detrition=costume.opotrebeni,
                amount=costume.pocet,
                prize=costume.cena,
                color=', '.join([color.barva for color in colors if color.kostym_id == costume.id]),
                action=render_template('update_actions.html', update_url='costumes-insert', id_=costume.id,
                                       delete_url='costume-delete')
            ))
        args = request.form
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': args.get('length', '10'),
                'iTotalDisplayRecords': str(len(costumes)),
                'data': costumes_data
        })


class CostumeDel(MethodView):
    def get(self):
        db.delete_costume(request.args.get('id'))
        flash('Kostým byl úspěšně smazán', 'alert-success')
        return redirect(url_for('costumes-admin'))


def configure(app):
    app.add_url_rule('/costumes-admin',
                     view_func=Costumes.as_view('costumes-admin'))

    app.add_url_rule('/costumes-data',
                     view_func=CostumesAdmin.as_view('costumes-data'))

    app.add_url_rule('/costume-delete',
                     view_func=CostumeDel.as_view('costume-delete'))
