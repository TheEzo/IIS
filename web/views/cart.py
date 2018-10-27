#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, jsonify, flash, session
from flask.views import MethodView

from collections import Counter

from web.roles import login_required
from web.core import db

class Cart(MethodView):

    def actualizePrize(self,action,type,id):
        if(action=="add"):
            session['cart']['prize'] += db.get_prize(type,id)[0]
        elif(action=="remove"):
            session['cart']['prize'] -= db.get_prize(type, id)[0]
            if (session['cart']['prize'] < 0):
                session['cart']['prize'] = 0


    @login_required
    def get(self):
        items = []

        for id in session['cart']['costumes']:
            items += db.get_product(id, "costumes")

        for id in session['cart']['accessories']:
            items += db.get_product(id, "accessories")


        return render_template('cart.html', items=list(set(items)), cos_count=Counter(session['cart']['costumes']), acc_count=Counter(session['cart']['accessories']))

    def post(self):
        data = request.json
        if(data['action'] == 'add'):
            if data['type'] == 'costumes':
                session['cart']['costumes'] += data['value']
            elif data['type'] == 'accessories':
                session['cart']['accessories'] += data['value']
            else:
                flash('Něco se pokazilo', 'alert-danger')
                return jsonify({})

            self.actualizePrize(data['action'],data['type'],data['value'])
            flash("Položky byly přidány do košíku", 'alert-success')
        elif (data['action'] == 'remove'):
            if data['type'] == 'costumes':
                for item in data['value']:
                    session['cart']['costumes'].remove(item)
            elif data['type'] == 'accessories':
                for item in data['value']:
                    session['cart']['accessories'].remove(item)
            else:
                flash('Něco se pokazilo', 'alert-danger')
                return jsonify({})
            flash("Položky byly odebrány z košíku", 'alert-success')
            self.actualizePrize(data['action'], data['type'], data['value'])
        return jsonify({})


def configure(app):
    app.add_url_rule('/cart',
                 view_func=Cart.as_view('cart'))
