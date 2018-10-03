#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, flash
from flask.views import MethodView
from wtforms import StringField, PasswordField
from wtforms.validators import required
from flask_login import login_user, current_user

from web.core.login import LoginForm, User
from web.core import db


class RegistrationForm(LoginForm):
    password_check = PasswordField('Kontrola hesla', validators=[required('Toto pole musí být vyplněno')])
    rc = StringField(u'Rodné číslo', validators=[required('Toto pole musí být vyplněno')])
    jmeno = StringField(u'Jméno', validators=[required('Toto pole musí být vyplněno')])
    prijmeni = StringField('Příjmení', validators=[required('Toto pole musí být vyplněno')])
    ulice = StringField('Ulice')
    cislo_popisne = StringField('Číslo popisné')
    mesto = StringField('Město')
    tel_cislo = StringField('Telefonní číslo')


class Register(MethodView):
    def get(self):
        if current_user.is_authenticated():
            return redirect(url_for('home'))
        return render_template('register.html', form=RegistrationForm())

    def post(self):
        form = RegistrationForm(request.form)
        if not form.validate():
            return render_template('register.html', form=form)
        if db.get_user(form.data.get('email')):
            flash('Uživatel již existuje', 'alert-danger')
            return render_template('register.html', form=form)
        db.create_user(**form.data)
        u = db.get_user(form.data.get('email'))
        user = User(email=u.email, rc=u.rc, name=u.jmeno, surname=u.prijmeni)
        login_user(user)
        flash('Registrace proběhla úspěšně', 'alert-success')
        return render_template('home.html')


def configure(app):
    app.add_url_rule('/register',
                     view_func=Register.as_view('register'))
