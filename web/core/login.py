#!/usr/bin/env python
# -*- coding: utf-8 -*-

import hashlib, uuid

from flask_login import login_user, logout_user
from flask import redirect, request, abort, url_for, flash, request, render_template, jsonify
from wtforms import StringField, Form, PasswordField
from wtforms.validators import email, regexp, ValidationError, data_required

from web.core import db


class LoginForm(Form):
    email = StringField('Email', validators=[email(message='Toto není email'),
                                             data_required('Pole musí být vyplněno')])
    password = PasswordField('Heslo', validators=[regexp(r'^(?=.*\d)(?=.*[A-ZĚŠČŘŽÝÁÍÉÚŮ]).{8,}$',
                                                         message='Heslo musí obsahovat číslo, velké písmeno a musí být alespoň 8 znalů dlouhé'),
                                                  data_required('Pole musí být vyplněno')])


def hash_password(password):
    return hashlib.sha512(password.encode('utf-8')).hexdigest()


def configure_login(app):
    @app.route("/logout")
    def logout():
        logout_user()
        return redirect(url_for('home'))

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if not request.form:
            return render_template('login.html', form=LoginForm())
        form = LoginForm(request.form)
        if not form.validate():
            return render_template('login.html', form=form)
        data = form.data

        hashed_password = hash_password(data.get('password'))
        u = db.get_user(data.get('email'), hashed_password)
        if not u:
            flash("Přihlášení se nezdařilo", 'alert-danger')
            return redirect(url_for('login'))
        user = User(email=u.email, id=u.rc, name=u.jmeno, surname=u.prijmeni)
        login_user(user)
        next = request.args.get('next')
        return redirect(next or url_for('home'))


class User:
    def __init__(self, id, email='', name='', surname=''):
        self.id = id
        self.email = email
        self.name = name + ' ' + surname

    def is_authenticated(self):
        if self.id:
            return True
        return False

    def is_active(self):
        return True

    def is_admin(self):
        pass # TODO

    def get_id(self):
        return self.id

    def get_email(self):
        return self.email

    def get_name(self):
        return self.name

