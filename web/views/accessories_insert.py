#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, flash
from flask.views import MethodView
from web.core import db
from wtforms import StringField, Form, SelectField, validators, TextAreaField,IntegerField, FileField, ValidationError
from wtforms.validators import data_required
from web.roles import employee
from datetime import datetime

class AddAccessory(Form):
    nazev = StringField("Název",[validators.Length(min=5, max=128,message="Pole musí obsahovat nejméně 5 znaků"),data_required('Pole musí být vyplněno')])
    vyrobce = StringField("Výrobce", [validators.Length(min=1, max=45, message="Pole musí obsahovat nejméně 1 znak"), data_required('Pole musí být vyplněno')])
    popis_vyuziti = TextAreaField("Popis využití", [validators.Length(min=10, max=512,message="Popis musí obsahovat nejméně 10 znaků"),data_required('Pole musí být vyplněno')])
    velikost = SelectField("Velikost",choices=[('S','S'),('M','M'),('L','L'),('XL','XL'),('XXL','XXL'),('XXXL','XXXL')])
    opotrebeni = SelectField("Opotřebení",
                           choices=[('nove', 'Nové'), ('stare', 'Staré'), ('zanovni', 'Zánovní')])
    pocet = IntegerField("Počet",[data_required('Pole musí být vyplněno')])
    material = StringField("Materiál", [validators.Length(min=2, max=45, message="Pole musí obsahovat nejméně 2 znaky"),data_required('Pole musí být vyplněno')])
    typ = StringField("Typ", [validators.Length(min=2, max=45, message="Pole musí obsahovat nejméně 2 znaky"),data_required('Pole musí být vyplněno')])
    datum_vyroby = StringField("Datum výroby", [data_required('Pole musí být vyplněno')])
    cena = IntegerField("Cena za kus",[data_required('Pole musí být vyplněno')])
    obrazek = FileField("Náhled")
    barva = SelectField("Barva",choices=[('červená','červená')])



class AccessoriesInsert(MethodView):
    @employee
    def get(self):

        return render_template('accessories_insert_form.html', form = AddAccessory())

    @employee
    def post(self):

        form = AddAccessory(request.form)
        if not form.validate():
            flash('Zadali jste špatné údaje', 'alert-danger')
            return render_template('accessories_insert_form.html', form=form)
        if datetime.strptime(form.data.get("datum_vyroby"),'%d.%m.%Y') > datetime.strptime(datetime.now().strftime("%d.%m.%Y"),"%d.%m.%Y"):
            flash('Zadejte platné datum', 'alert-danger')
            return render_template('new_order_form.html', form=form)
        db.add_accessory(**form.data)
        flash('Doplněk byl úspěšně přidán', 'alert-success')
        return render_template('home.html')

        #@employee
        #def post(self):
        #form = AddAccessory(request.form)
        #if not form.validate():
        #    flash('Zadali jste špatné údaje', 'alert-danger')
        #    return render_template('accessories_admin.html', form=form)
            # if datetime.strptime(form.data.get("datum_vyroby"),'%d.%m.%Y') > datetime.strptime(datetime.now().strftime("%d.%m.%Y"),"%d.%m.%Y"):
            #     flash('Zadejte platné datum', 'alert-danger')
            #     return render_template('new_order_form.html', form=form)
        #image = request.files['obrazek'].stream.read()
        #db.add_accessory(image, **form.data)
        #flash('Doplněk byl úspěšně přidán', 'alert-success')
        #return render_template('home.html')

def configure(app):
    app.add_url_rule('/accessories-insert',
                 view_func=AccessoriesInsert.as_view('accessories-insert'))
