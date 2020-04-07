#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, jsonify
from flask.views import MethodView
from web.core import db
from datetime import datetime


class Costumes(MethodView):
    def get(self):
        data = [self.costume_json(item) for item in db.get_all_costumes()]
        return jsonify(data)

    def delete(self):
        ...

    def post(self):

        return jsonify({})

    @staticmethod
    def costume_json(data):
        return dict(
            color=data.barva,
            price=data.cena,
            id=data.id,
            material=data.material,
            name=data.nazev,
            image=url_for('static', filename=data.obrazek),
            wear_level=data.opotrebeni,
            count=data.pocet,
            description=data.popis,
            size=data.velikost,
            manufacturer=data.vyrobce
        )


def configure(app):
    app.add_url_rule('/costumes', view_func=Costumes.as_view('costumes'))

    @app.route('/costumes/<obj_id>')
    def get_costume(obj_id):
        costume = db.get_costume_by_id(obj_id)
        return jsonify(Costumes.costume_json(costume))

    # @app.route('/costumes_list', methods=['POST'])
    # def getCostumeData():
    #     request_json = request.get_json()
    #     costumes, usages = db.get_products_data(request_json.get('limit', 10), request_json.get('start', 0), request_json.get('url'))
    #     templates_list = []
    #     for costume in costumes:
    #         usage = ', '.join([u.Vyuziti.druh_akce for u in usages if u.KostymVyuziti.kostym_id == costume.id])
    #         if costume.opotrebeni == 'nove':
    #             detrition = 'Nové'
    #         elif costume.opotrebeni == 'zanovni':
    #             detrition = 'Zánovní'
    #         else:
    #             detrition = 'Staré'
    #         templates_list.append(render_template('costume_template.html', data=costume, detrition=detrition,
    #                                               usage=usage))
    #     return jsonify(templates_list)
