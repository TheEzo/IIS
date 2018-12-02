#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, jsonify, flash, session
from flask.views import MethodView
from flask_login import current_user
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
        price = 0
        for id in session['cart']['costumes']:
            data = db.get_product(id, "costumes")
            price += data.cena
            items.append(data)

        for id in session['cart']['accessories']:
            data = db.get_product(id, "accessories")
            items.append(data)
            price += data.cena

        return render_template('cart.html', items=list(set(items)), cos_count=Counter(session['cart']['costumes']),
                               acc_count=Counter(session['cart']['accessories']), price=price)

    def post(self):
        if not current_user.is_authenticated():
            flash('Pro tuto akci je vyžadováno přihlášení <a href="' + url_for('login') + '">Přihlásit?</a>', "alert-warning")
            return jsonify({})
        data = request.json
        if data['action'] == 'add':
            db_data = db.get_product_amount(data['type'], data['value'])[0]
            if session['cart'][data['type']].count(data['value']) == db_data:
                flash("Není možné vložit do košíku více než dostupný počet kusů", "alert-danger")
                return jsonify({})
            if db_data == 0:
                flash('Toto zboží je momentálně nedostupné', 'alert-danger')
                return jsonify({})

            if data['type'] == 'costumes':
                session['cart']['costumes'].append(data['value'])
            elif data['type'] == 'accessories':
                session['cart']['accessories'].append(data['value'])
            else:
                flash('Něco se pokazilo', 'alert-danger')
                return jsonify({})
            flash("Položka byla přidána do košíku", 'alert-success')

        elif data['action'] == 'remove':
            if data['type'] == 'costumes':
                    session['cart']['costumes'].remove(data['value'])
            elif data['type'] == 'accessories':
                    session['cart']['accessories'].remove(data['value'])
            else:
                flash('Něco se pokazilo', 'alert-danger')
                return jsonify({})
            flash("Položka byla odebrána z košíku", 'alert-success')
        return jsonify({})


def configure(app):
    app.add_url_rule('/cart',
                 view_func=Cart.as_view('cart'))
