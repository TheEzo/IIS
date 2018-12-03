#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, flash
from flask.views import MethodView
from web.core import db
from wtforms import StringField, Form, SelectField, validators, TextAreaField,IntegerField, FileField, ValidationError
from wtforms.validators import data_required
from web.roles import employee
from datetime import datetime


class AddUseForm(Form):
    vyuziti = StringField("Využití",[validators.Length(min=2, max=128,message="Pole musí obsahovat nejméně 2 znaky"),data_required('Pole musí být vyplněno')])


class PropertyAdmin(MethodView):
    @employee
    def get(self):
        return render_template('property_insert.html', form_use=AddUseForm())


class AddUse(MethodView):
    @employee
    def post(self):

        form = AddUseForm(request.form)
        if not form.validate():
            flash('Zadali jste špatné údaje', 'alert-danger')
            return render_template('property_insert.html', form_use=form)
        if db.get_use(form.data.get("vyuziti")):
            flash('Zadaný typ využití již v databázi existuje', 'alert-danger')
            return render_template('property_insert.html', form_use=form)
        db.insert_use(**form.data)
        flash('Typ využití byl úspěšně přidán', 'alert-success')
        return render_template('property_insert.html', form_use=AddUseForm())


def configure(app):
    app.add_url_rule('/property-admin',
                     view_func=PropertyAdmin.as_view('property-insert'))

    app.add_url_rule('/add-use',
                     view_func=AddUse.as_view('add-use'))