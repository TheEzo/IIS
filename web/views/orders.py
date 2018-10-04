#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for
from flask.views import MethodView

from web.roles import login_required
from web.core import db


class Orders(MethodView):
    @login_required
    def get(self):

        return render_template('orders.html')


def configure(app):
    app.add_url_rule('/orders',
                 view_func=Orders.as_view('orders'))
