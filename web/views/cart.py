#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import request, jsonify, session
from flask.views import MethodView

from web.roles import login_required
from web.core import db
from web.views.costumes import Costumes
from web.views.accessories import Accessories


class Cart(MethodView):
    # @login_required
    def get(self):
        items = dict(price=0, costumes=[], accessories=[])
        for costume in session.get('cart', {}).get('costumes', []):
            items['costumes'].append(Costumes.data_json(db.get_costume_by_id(costume)))
        for accessory in session.get('cart', {}).get('accessories', []):
            items['accessories'].append(Accessories.data_json(db.get_accessory_by_id(accessory)))
        items['price'] = sum([i['price'] for i in items['costumes'] + items['accessories']])
        return jsonify(items)

    def post(self):
        data = dict(request.form)
        # TODO submit request, upravit pocty v db
        db.create_order(dict(
            datum_vraceni=data['return_date'], # TODO asi nepojede datum v db
            nazev_akce=data['name'],

        ))
        return '', 200

    def delete(self):
        session['cart'] = {'costumes': [], 'accessories': []}
        return '', 200


def configure(app):
    app.add_url_rule('/cart', view_func=Cart.as_view('cart'))

    @app.route('/cart_manage', methods=['POST'])
    # @login_required
    def cart_add():
        data = dict(request.form)
        if data['item'] not in ['costumes', 'accessories']:
            return '', 400
        try:
            cnt = int(data['count'])
            item = int(data['id'])
            if cnt == 0:
                while item in session['cart'][data['item']]:
                    session['cart'][data['item']].remove(item)
            elif cnt > 0:
                if data['item'] == 'costumes':
                    obj = db.get_costume_by_id(item)
                else:
                    obj = db.get_accessory_by_id(item)
                if obj.pocet < cnt:
                    return '', 400
                for i in range(cnt):
                    session['cart'][data['item']].append(item)
            else:
                for i in range(cnt):
                    if item in session['cart'][data['item']]:
                        session['cart'][data['item']].remove(item)
        except Exception:
            return '', 400
        return '', 200
