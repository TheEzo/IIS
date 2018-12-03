#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, flash
from flask.views import MethodView
from flask_login import current_user
from wtforms import StringField, Form, SelectField, validators, TextAreaField,IntegerField, FileField, SelectMultipleField
from wtforms.validators import data_required, required,length, email

from web.roles import login_required
from web.core import db

class ProfileForm(Form):
    rc = StringField(u'Rodné číslo', validators=[length(min=10, max=10, message="Pole musí obsahovat přesně 10 znaků"),required('Toto pole musí být vyplněno')])
    jmeno = StringField(u'Jméno', validators=[required('Toto pole musí být vyplněno')])
    prijmeni = StringField('Příjmení', validators=[required('Toto pole musí být vyplněno')])
    ulice = StringField('Ulice')
    cislo_popisne = StringField('Číslo popisné')
    obec = StringField('Obec')
    tel_cislo = StringField('Telefonní číslo')
    email = StringField('Email', validators=[email(message='Toto není email'),
                                             data_required('Pole musí být vyplněno')])


class Profile(MethodView):
    @login_required
    def get(self):
        user = db.get_user_profile(current_user.get_email())
        position = None
        if user[1]:
            position = 'Vedoucí' if user[1] == 'vedouci' else 'Zaměstnanec'
        return render_template('profile.html', data=user[0], membership=user[2], position=position)

class EditProfile(MethodView):

        @login_required
        def get(self):
            id = request.args.get("edit-profile")
            user = db.get_user_profile(id)
            form = ProfileForm(
                jmeno=user[0].jmeno,
                prijmeni = user[0].prijmeni,
                ulice=user[0].ulice,
                cislo_popisne=user[0].cislo_popisne,
                obec=user[0].obec,
                tel_cislo=user[0].tel_cislo,
                email=user[0].email,
                rc=user[0].rc
            )
            return render_template('edit_profile.html',form=form)

        @login_required
        def post(self):
            form = ProfileForm(request.form)
            if not form.validate():
                flash('Zadali jste špatné údaje', 'alert-danger')
                return render_template('edit_profile.html', form=form)
            if not form.data['email'] == current_user.get_email():
                if db.get_user(form.data['email']):
                    flash('Profil s tímto emailem již existuje', 'alert-danger')
                    return render_template('edit_profile.html', form=form)

            db.update_users_data(form.data)
            flash('Profil uspěšně aktualizován', 'alert-success')
            return render_template("costumes.html")


def configure(app):
    app.add_url_rule('/profile',
                 view_func=Profile.as_view('profile'))

    app.add_url_rule('/edit-profile',
                     view_func=EditProfile.as_view('edit-profile'))

