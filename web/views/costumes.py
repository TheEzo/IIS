#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, jsonify
from flask.views import MethodView
from web.core import db
from datetime import datetime


class Costumes(MethodView):
    def get(self):

        return render_template('costumes.html')


def configure(app):
    app.add_url_rule('/costumes',
                 view_func=Costumes.as_view('costumes'))

    @app.route('/costumes_list', methods=['POST'])
    def getCostumeData():
        request_json = request.get_json()
        costumes, colors, usages = db.get_products_data(request_json.get('limit'), request_json.get('start'), request_json.get('url'))
        templates_list = []
        for costume in costumes:
            color = ', '.join([c.barva for c in colors if c.kostym_id == costume.id])
            usage = ', '.join([u.Vyuziti.druh_akce for u in usages if u.KostymVyuziti.kostym_id == costume.id])
            templates_list.append(render_template('costume_template.html', data=costume,
                                                  color=color, usage=usage))
        return jsonify(templates_list)
