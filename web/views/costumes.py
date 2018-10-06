#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import render_template, request, redirect, url_for, jsonify
from flask.views import MethodView
from web.core import db

class Costumes(MethodView):
    def get(self):

        return render_template('costumes.html')

#class getCostumes(MethodView):
 #   def post(self):


def configure(app):
    app.add_url_rule('/costumes',
                 view_func=Costumes.as_view('costumes'))

    #app.add_url_rule('/costumes_list',
     #                view_func=getCostumes.as_view('costumes-list'))

    @app.route('/costumes_list',methods = ['POST'])
    def getData():
        request_json = request.get_json()
        costumes = db.get_costumes_data(request_json.get('limit'),request_json.get('start'))
        templates_list = []
        for costume in costumes:
            templates_list.append(render_template('costume_template.html',costume = costume))
        return jsonify(templates_list)