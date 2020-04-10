#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import request, url_for, jsonify
from flask.views import MethodView

from web.core import db
from web.roles import admin


class Accessories(MethodView):
    def get(self):
        data = [self.data_json(d) for d in db.get_accessories_data()]
        return jsonify(data)

    def post(self):
        # TODO save image from form to static
        data = request.json
        db.add_accessory(**dict(
            id=data['id'],
            nazev=data['name'],
            vyrobce=data['manufacturer'],
            material=data['material'],
            popis_vyuziti=data['description'],
            velikost=data['size'],
            datum_vyroby=data.get('date_created', '1.1.1990'),
            opotrebeni=data['wear_level'],
            pocet=data['count'],
            cena=data['price'],
            barva=data['color'],
            image=data['image']
        ))
        return '', 200

    @staticmethod
    @admin
    def delete(obj_id):
        if db.get_accessory_by_id(obj_id):
            db.delete_accessory(obj_id)
            return '', 200
        return '', 404

    @staticmethod
    def data_json(data):
        return dict(
            color=data.barva,
            price=data.cena,
            id=data.id,
            material=data.material,
            name=data.nazev,
            image=url_for('static', filename=data.obrazek),
            wear_level=data.opotrebeni,
            count=data.pocet,
            description=data.popis_vyuziti,
            type=data.typ,
            size=data.velikost,
            manufacturer=data.vyrobce
        )


def configure(app):
    app.add_url_rule('/accessories', view_func=Accessories.as_view('accessories'))

    @app.route('/accessories/<int:obj_id>', methods=['GET'])
    def get_accessories(obj_id):
        if request.method == 'GET':
            data = db.get_accessory_by_id(obj_id)
            if data:
                return jsonify(Accessories.data_json(data))
            return '', 400
        if request.method == 'DELETE':
            return Accessories.delete(obj_id)
