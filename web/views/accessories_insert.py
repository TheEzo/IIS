#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from flask import render_template, request, redirect, url_for, flash
from flask.views import MethodView
from web.core import db
from wtforms import StringField, Form, SelectField, validators, TextAreaField,IntegerField, FileField, SelectMultipleField
from wtforms.validators import data_required
from web.roles import employee
from datetime import datetime
from utils import workdir


class AddAccessory(Form):
    id = StringField('id')
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
    barva = SelectMultipleField("Barva", choices=[(record.barva, record.barva[0].upper() + record.barva[1:])
                                                  for record in db.get_all_colors()], default=[])


class AccessoriesInsert(MethodView):
    @employee
    def get(self):
        title = "Přidat doplněk"
        id = request.args.get('id', None)
        if id:
            title = "Upravit doplněk"
            accessory = db.get_accessory_by_id(id)
            form = AddAccessory(
                id=accessory.id,
                nazev=accessory.nazev,
                vyrobce=accessory.vyrobce,
                popis_vyuziti=accessory.popis_vyuziti,
                velikost=accessory.velikost,
                opotrebeni=accessory.opotrebeni,
                pocet=accessory.pocet,
                material=accessory.material,
                typ=accessory.typ,
                datum_vyroby=accessory.datum_vyroby.strftime('%d.%m.%Y'),
                cena=accessory.cena
            )
            colors = db.get_accessory_colors(id)
            if colors:
                for color in colors:
                    form.barva.default.append(color.barva)
            return render_template('accessories_insert_form.html', form=form,title=title)
        return render_template('accessories_insert_form.html', form=AddAccessory(),title=title)

    @employee
    def post(self):
        form = AddAccessory(request.form)
        if not form.validate():
            flash('Zadali jste špatné údaje', 'alert-danger')
            return render_template('accessories_insert_form.html', form=form)
        if datetime.strptime(form.data.get("datum_vyroby"), '%d.%m.%Y') > datetime.strptime(datetime.now().strftime("%d.%m.%Y"),"%d.%m.%Y"):
            flash('Zadejte platné datum', 'alert-danger')
            return render_template('accessories_insert_form.html', form=form)
        if 'obrazek' in request.files:
            image = request.files['obrazek']
            with open(os.path.join(workdir, 'web', 'static', image.filename), 'wb') as f:
                f.write(image.stream.read())
            image = image.filename
        else:
            image = None
        db.add_accessory(image, **form.data)
        flash('Doplněk byl úspěšně přidán', 'alert-success')
        return render_template('home.html')


def configure(app):
    app.add_url_rule('/accessories-insert',
                     view_func=AccessoriesInsert.as_view('accessories-insert'))
