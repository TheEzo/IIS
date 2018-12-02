#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from flask import render_template, request, redirect, url_for, flash
from flask.views import MethodView
from web.core import db
from wtforms import StringField, Form, SelectField, validators, TextAreaField, IntegerField, FileField, SelectMultipleField
from wtforms.validators import data_required
from web.roles import employee
from datetime import datetime

from utils import workdir


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
    barva = SelectMultipleField("Barva", choices=[(record.barva, record.barva[0].upper() + record.barva[1:])
                                                  for record in db.get_all_colors()], default=[])
    vyuziti = SelectMultipleField("Využití", choices=[(record.id, record.druh_akce)
                                                      for record in db.get_usages()], default=[])


class CostumesInsert(MethodView):
    @employee
    def get(self):
        id = request.args.get('id', None)
        if id:
            costume = db.get_costume_by_id(id)
            form = AddCostume(
                id=costume.id,
                nazev=costume.nazev,
                vyrobce=costume.vyrobce,
                material=costume.material,
                popis=costume.popis,
                velikost=costume.velikost,
                opotrebeni=costume.opotrebeni,
                pocet=costume.pocet,
                datum_vyroby=costume.datum_vyroby.strftime('%d.%m.%Y'),
                cena=costume.cena,
                obrazek=costume.obrazek
            )
            colors = db.get_costume_color(id)
            if colors:
                for color in colors:
                    form.barva.default.append(color.barva)
            usages = db.get_costume_usage(id)
            if usages:
                for usage in usages:
                    form.vyuziti.default.append(usage.vyuziti_id)
            return render_template('costumes_insert_form.html', form=form)
        return render_template('costumes_insert_form.html', form=AddCostume())

    @employee
    def post(self):
        form = AddCostume(request.form)
        if not form.validate():
            if len(form.errors.keys()) and 'vyuziti' not in form.errors:
                flash('Zadali jste špatné údaje', 'alert-danger')
                return render_template('costumes_insert_form.html', form=form)
        if datetime.strptime(form.data.get("datum_vyroby"), '%d.%m.%Y') > datetime.strptime(datetime.now().strftime("%d.%m.%Y"), "%d.%m.%Y"):
            flash('Zadejte platné datum', 'alert-danger')
            return render_template('costumes_insert_form.html', form=form)
        if 'obrazek' in request.files:
            image = request.files['obrazek']
            with open(os.path.join(workdir, 'web', 'static', image.filename), 'wb') as f:
                f.write(image.stream.read())
            image = image.filename
        else:
            image = None
        db.add_or_update_costume(image, **form.data)
        flash('Kostým byl úspěšně přidán', 'alert-success')
        return render_template('home.html')


def configure(app):
    app.add_url_rule('/costumes-insert',
        view_func=CostumesInsert.as_view('costumes-insert'))
