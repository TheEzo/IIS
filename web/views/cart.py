#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, jsonify, flash, session
from flask.views import MethodView

from collections import Counter

from web.roles import login_required
from web.core import db


class Cart(MethodView):
    @login_required
    def get(self):
        items = []
        costumes_count = Counter(session['cart']['costumes'])
        accessories_count = Counter(session['cart']['accessories'])

        for id, num in costumes_count.items():
            items += db.get_product(id, "costumes")

        for id, num in accessories_count.items():
            items += db.get_product(id, "accessories")
        return render_template('cart.html', items=items, cos_count=costumes_count, acc_count=accessories_count)

    def post(self):
        data = request.json
        if(data['action'] == 'add'):
            if data['type'] == 'costumes':
                session['cart']['costumes'] += data['values']
            elif data['type'] == 'accessories':
                session['cart']['accessories'] += data['values']
            else:
                flash('Něco se pokazilo', 'alert-danger')
                return jsonify({})
            flash("Položky byly přidány do košíku", 'alert-success')
        elif (data['action'] == 'remove'):
            if data['type'] == 'costumes':
                for item in data['values']:
                    session['cart']['costumes'].remove(item)
            elif data['type'] == 'accessories':
                for item in data['values']:
                    session['cart']['accessories'].remove(item)
            else:
                flash('Něco se pokazilo', 'alert-danger')
                return jsonify({})
            flash("Položky byly odebrány z košíku", 'alert-success')

        return jsonify({})


def configure(app):
    app.add_url_rule('/cart',
                 view_func=Cart.as_view('cart'))
