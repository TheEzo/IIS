from flask import render_template
from flask.views import MethodView
from flask_login import login_required

from wtforms import StringField, Form, SelectField, validators, TextAreaField,IntegerField, FileField
from wtforms.validators import data_required


class OrderForm(Form):
    nazev_akce = StringField("Název akce", [validators.Length(min=2, max=256),data_required('Pole musí být vyplněno')])
    cena = IntegerField("Cena",[data_required('Pole musí být vyplněno')])


class NewOrder(MethodView):
    @login_required
    def get(self):
        return render_template('new_order_form.html', form=OrderForm())

    def post(self):
        pass


def configure(app):
    app.add_url_rule('/new-order',
                     view_func=NewOrder.as_view('new-order'))
