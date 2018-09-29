#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for
from flask.views import MethodView
from wtforms import StringField, PasswordField
from wtforms.validators import Email

from web.core.login import LoginForm
from web.core import db


class RegistrationForm(LoginForm):
    password_check = PasswordField('Kontrola hesla')
    rc = StringField(u'Rodné číslo')
    jmeno = StringField(u'Jméno')
    prijmeni = StringField('Příjmení')
    ulice = StringField('Ulice')
    cislo_popisne = StringField('Číslo popisné')
    mesto = StringField('Město')
    tel_cislo = StringField('Telefonní číslo')


class Register(MethodView):
    def get(self):
        return render_template('register.html', form=RegistrationForm())

    def post(self):
        form = RegistrationForm(request.form)
        if not form.validate():
            return render_template('register.html', form=form)
        db.create_user(**form.data)
        return render_template('home.html')


def configure(app):
    app.add_url_rule('/register',
                     view_func=Register.as_view('register'))
