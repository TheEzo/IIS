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

    def actualizeAmount(self,action,type,id):
        amount = 0
        if (action == "add"):
            amount = db.get_product_amount(type, id)[0]
            db.set_product_amount(type,id,amount-1)
        elif (action == "remove"):
            amount = db.get_product_amount(type, id)[0]
            db.set_product_amount(type, id, amount + 1)


    @login_required
    def get(self):
        items = []

        for id in session['cart']['costumes']:
            items += db.get_product(id, "costumes")

        for id in session['cart']['accessories']:
            items += db.get_product(id, "accessories")


        return render_template('cart.html', items=list(set(items)), cos_count=Counter(session['cart']['costumes']), acc_count=Counter(session['cart']['accessories']))

    @login_required
    def post(self):
        data = request.json
        if(data['action'] == 'add'):
            if db.get_product_amount(data['type'], data['value'])[0] == 0:
                flash('Toto zboží je momentálně nedostupné', 'alert-danger')
                return jsonify({})

            if data['type'] == 'costumes':
                session['cart']['costumes'][data['value']] = [data['color']]
                #session['cart']['costumes'].append(data['value'])
            elif data['type'] == 'accessories':
                session['cart']['accessories'].append(data['value'])
            else:
                flash('Něco se pokazilo', 'alert-danger')
                return jsonify({})

            self.actualizePrize(data['action'],data['type'],data['value'])
            self.actualizeAmount(data['action'],data['type'],data['value'])
            flash("Položky byly přidány do košíku", 'alert-success')

        elif (data['action'] == 'remove'):
            if data['type'] == 'costumes':
                    session['cart']['costumes'].remove(data['value'])
            elif data['type'] == 'accessories':
                    session['cart']['accessories'].remove(data['value'])
            else:
                flash('Něco se pokazilo', 'alert-danger')
                return jsonify({})
            self.actualizePrize(data['action'], data['type'], data['value'])
            self.actualizeAmount(data['action'], data['type'], data['value'])
            flash("Položky byly odebrány z košíku", 'alert-success')

        return jsonify({})


def configure(app):
    app.add_url_rule('/cart',
                 view_func=Cart.as_view('cart'))
