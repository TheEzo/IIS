from flask import render_template
from flask.views import MethodView


class Users(MethodView):
    def get(self):
        return render_template('users.html')


class UsersData(MethodView):
    def post(self):
        return

    def get(self):
        return


def configure(app):
    app.add_url_rule('/users',
                     view_func=Users.as_view('users'))
    app.add_url_rule('/users-data',
                     view_func=UsersData.as_view('users-data'))