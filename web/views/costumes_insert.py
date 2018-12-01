#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, flash
from flask.views import MethodView
from web.core import db
from wtforms import StringField, Form, SelectField, validators, TextAreaField,IntegerField, FileField
from wtforms.validators import data_required
from web.roles import employee
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from datetime import datetime


class Barva(db.Barva):
    def __repr__(self):
        return "%s" % (self.barva)

class Vyuziti(db.Vyuziti):
    def __repr__(self):
        return "%s" % (self.druh_akce)



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
    barva = QuerySelectField("Barva", query_factory=lambda: Barva.query, allow_blank=False)
    vyuziti = QuerySelectField("Využití", query_factory=lambda: Vyuziti.query, allow_blank=False)

class CostumesInsert(MethodView):
    @employee
    def get(self):
        return render_template('costumes_insert_form.html', form = AddCostume())

    @employee
    def post(self):
        form = AddCostume(request.form)
        if not form.validate():
            flash('Zadali jste špatné údaje', 'alert-danger')
            return render_template('costumes_insert_form.html', form=form)
        if datetime.strptime(form.data.get("datum_vyroby"),'%d.%m.%Y') > datetime.strptime(datetime.now().strftime("%d.%m.%Y"),"%d.%m.%Y"):
            flash('Zadejte platné datum', 'alert-danger')
            return render_template('new_order_form.html', form=form)
        db.add_costume(**form.data)
        flash('Kostým byl úspěšně přidán', 'alert-success')
        return render_template('home.html')

def configure(app):
    app.add_url_rule('/costumes-insert',
        view_func=CostumesInsert.as_view('costumes-insert'))
