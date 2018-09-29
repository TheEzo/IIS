#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for
from flask.views import MethodView

from web.core import db


class Profile(MethodView):
    def get(self):

        return render_template('profile.html')


def configure(app):
    app.add_url_rule('/profile',
                 view_func=Profile.as_view('profile'))
