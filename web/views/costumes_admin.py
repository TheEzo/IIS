#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, flash
from flask.views import MethodView
from web.core import db
from wtforms import StringField, Form, SelectField, validators, TextAreaField,IntegerField, FileField
from wtforms.validators import data_required
from web.roles import employee
from wtforms.widgets import CheckboxInput


class AddCostume(Form):
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


class CostumesAdmin(MethodView):
    @employee
    def get(self):

        colors = db.get_colors()
        colors_list = []
        for color in colors:
            colors_list.append((color.barva,color.barva))
        barva = SelectField("Barva",choices=colors_list)
        setattr(AddCostume,"barva",barva)

        uses = db.get_uses()
        uses_list = []
        for uses in uses:
            uses_list.append((uses.id, uses.druh_akce))
        vyuziti = SelectField("Využití", choices=uses_list)
        setattr(AddCostume, "vyuziti", vyuziti)

        return render_template('costumes_admin.html', form = AddCostume())

    @employee
    def post(self):
        form = AddCostume(request.form)

        db.add_costume(**form.data)

        flash('Kostým byl úspěšně přidán', 'alert-success')
        return render_template('home.html')

def configure(app):
    app.add_url_rule('/costumes-admin',
        view_func=CostumesAdmin.as_view('costumes-admin'))
