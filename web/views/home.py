from flask import render_template
from flask.views import MethodView


class Home(MethodView):
    def get(self):
        return render_template('home.html')


def configure(app):
    app.add_url_rule('/home',
                     view_func=Home.as_view('home'))
