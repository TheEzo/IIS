#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, jsonify, flash, session
from flask.views import MethodView

from web.roles import login_required
from web.core import db


class Orders(MethodView):
    @login_required
    def get(self):

        return render_template('orders.html')

    def post(self):
        data = request.json
        if data['type'] == 'costumes':
            session['cart']['costumes'] += data['values']
        elif data['type'] == 'accessories':
            session['cart']['accessories'] += data['values']
        else:
            flash('Něco se pokazilo', 'alert-danger')
            return jsonify({})
        flash("Položky byly přidány do košíku", 'alert-success')
        return jsonify({})


def configure(app):
    app.add_url_rule('/orders',
                 view_func=Orders.as_view('orders'))
