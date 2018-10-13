#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for
from flask.views import MethodView
from flask_login import current_user

from web.core import db


class Profile(MethodView):
    def get(self):
        user = dict(db.get_user_profile(current_user.get_email()))
        if user[1]:
            user[1] = 'Vedoucí' if user[1] == 'vedouci' else 'Zaměstnanec'
        return render_template('profile.html', data=user)


def configure(app):
    app.add_url_rule('/profile',
                 view_func=Profile.as_view('profile'))
