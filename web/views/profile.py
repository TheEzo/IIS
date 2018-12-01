#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for
from flask.views import MethodView
from flask_login import current_user

from web.roles import login_required
from web.core import db


class Profile(MethodView):
    @login_required
    def get(self):
        user = db.get_user_profile(current_user.get_email())
        position = None
        if user[1]:
            position = 'Vedoucí' if user[1] == 'vedouci' else 'Zaměstnanec'
        return render_template('profile.html', data=user[0], membership=user[2], position=position)


def configure(app):
    app.add_url_rule('/profile',
                 view_func=Profile.as_view('profile'))
