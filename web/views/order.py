from flask import render_template
from flask.views import MethodView
from flask_login import login_required


class Order(MethodView):
    @login_required
    def get(self):
        return render_template('order.html')


def configure(app):
    app.add_url_rule('/order',
                     view_func=Order.as_view('order'))
