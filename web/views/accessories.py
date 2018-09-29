#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for
from flask.views import MethodView

from web.core import db


class Accessories(MethodView):
    def get(self):

        return render_template('accessories.html')


def configure(app):
    app.add_url_rule('/accessories',
                 view_func=Accessories.as_view('accessories'))
