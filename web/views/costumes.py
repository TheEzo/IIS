#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import request, url_for, jsonify
from flask.views import MethodView
from web.core import db
from web.roles import admin, employee
from wtforms import StringField, validators, TextAreaField, SelectField, Form, IntegerField, FileField, SelectMultipleField
from wtforms.validators import data_required


class AddCostume(Form):
    id = StringField('id')
    nazev = StringField("Název", [validators.Length(min=5, max=128), data_required('Pole musí být vyplněno')])
    vyrobce = StringField("Výrobce",[validators.Length(min=1, max=45),data_required('Pole musí být vyplněno')])
    material = StringField("Materiál", [validators.Length(min=2, max=45),data_required('Pole musí být vyplněno')])
    popis = TextAreaField("Popis", [validators.Length(min=10, max=512),data_required('Pole musí být vyplněno')])
    velikost = SelectField("Velikost",choices=[('S','S'),('M','M'),('L','L'),('XL','XL'),('XXL','XXL'),('XXXL','XXXL')])
    opotrebeni = SelectField("Opotřebení",
                           choices=[('nove', 'Nové'), ('stare', 'Staré'), ('zanovni', 'Zánovní')])
    pocet = IntegerField("Počet", [data_required('Pole musí být vyplněno')])
    datum_vyroby = StringField("Datum výroby", [data_required('Pole musí být vyplněno')])
    cena = IntegerField("Cena za kus", [data_required('Pole musí být vyplněno')])
    obrazek = FileField("Náhled")
    barva = StringField("Barva")
    vyuziti = SelectMultipleField("Využití", choices=[(record.id, record.druh_akce)
                                                      for record in db.get_usages()], default=[])


class Costumes(MethodView):
    def get(self):
        data = [self.data_json(item) for item in db.get_all_costumes()]
        return jsonify(data)

    @employee
    def post(self):
        # TODO save image from form to static
        data = request.form
        db.add_or_update_costume(**dict(
            id=data.get('id'),
            nazev=data['name'],
            vyrobce=data['manufacturer'],
            material=data['material'],
            popis=data['description'],
            velikost=data['size'],
            datum_vyroby=data.get('date_created', '1.1.1990'),
            opotrebeni=data['wear_level'],
            pocet=data['count'],
            cena=data['price'],
            vyuziti=[],
            barva=data['color']), image=data['image'])
        return '', 200

    @staticmethod
    def data_json(data):
        return dict(
            color=data.barva,
            price=data.cena,
            id=data.id,
            material=data.material,
            name=data.nazev,
            image=url_for('static', filename=data.obrazek),
            wear_level=data.opotrebeni,
            count=data.pocet,
            description=data.popis,
            size=data.velikost,
            manufacturer=data.vyrobce
        )

    @staticmethod
    @admin
    def delete():
        obj_id = int(request.form['id'])
        if db.get_costume_by_id(obj_id):
            db.delete_costume(obj_id)
            return '', 200
        else:
            return '', 404


def configure(app):
    app.add_url_rule('/costumes', view_func=Costumes.as_view('costumes'))

    @app.route('/costumes/<int:obj_id>', methods=['GET', 'DELETE'])
    def get_costume(obj_id):
        if request.method == 'GET':
            costume = db.get_costume_by_id(obj_id)
            if not costume:
                return '', 400
            return jsonify(Costumes.data_json(costume))
        if request.method == 'DELETE':
            return Costumes.delete(obj_id)
