from flask.views import MethodView
from flask import render_template, request,jsonify
from web.core import db
from flask_login import current_user


class Accessories(MethodView):
    def get(self):
        return render_template('accessories_admin.html')


<<<<<<< HEAD
    @employee
    def post(self):
        form = AddAccessory(request.form)
        if not form.validate():
            flash('Zadali jste špatné údaje', 'alert-danger')
            return render_template('accessories_admin.html', form=form)
            # if datetime.strptime(form.data.get("datum_vyroby"),'%d.%m.%Y') > datetime.strptime(datetime.now().strftime("%d.%m.%Y"),"%d.%m.%Y"):
            #     flash('Zadejte platné datum', 'alert-danger')
            #     return render_template('new_order_form.html', form=form)
        image = request.files['obrazek'].stream.read()
        db.add_accessory(image, **form.data)
        flash('Doplněk byl úspěšně přidán', 'alert-success')
        return render_template('home.html')
=======
class AccessoriesAdmin(MethodView):

    def process_accessory(self,data):
        accessory = data[0]
        color = data[1]

        return dict(
            name=accessory.nazev,
            producer=accessory.vyrobce,
            material=accessory.material,
            description=accessory.popis_vyuziti,
            type=accessory.typ,
            size=accessory.velikost,
            date_of_manufacture=accessory.datum_vyroby,
            detrition=accessory.opotrebeni,
            amount=accessory.pocet,
            prize=accessory.cena,
            color=color.barva,
            )

    def post(self):
        accessories = db.get_accessories()
        accessories_data = []
        for accessory in accessories:
            accessories_data.append(self.process_accessory(accessory))
        args = request.form
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': args.get('length', '10'),
                'iTotalDisplayRecords': str(len(accessories)),
                'data': accessories_data
        })
>>>>>>> 49ac71e7a8fa394e3246f704c22937397178952f


def configure(app):
    app.add_url_rule('/accessories-admin',
                     view_func=Accessories.as_view('accessories-admin'))

    app.add_url_rule('/accessories-data',
                     view_func=AccessoriesAdmin.as_view('accessories-data'))