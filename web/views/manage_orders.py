from flask import render_template, jsonify, request, flash
from flask.views import MethodView
from flask_login import current_user

from web.core import db
from web.roles import employee


class ManageOrders(MethodView):
    @employee
    def get(self):
        return render_template('orders_admin.html')

    @employee
    def post(self):
        orders, orders_costumes, orders_accessories = db.get_all_orders()
        res = []
        for order in orders:
            price = sum([record.Kostym.cena for record in orders_costumes if record[0] == order.Vypujcka.id])
            price += sum([record.Doplnek.cena for record in orders_accessories if record[0] == order.Vypujcka.id])
            costumes = [record.Kostym.nazev + ' (' + record.Kostym.velikost + ')' for record in orders_costumes if
                        record[0] == order.Vypujcka.id]
            accessories = [record.Doplnek.nazev + ' (' + record.Doplnek.velikost + ')' for record in orders_accessories
                           if record[0] == order.Vypujcka.id]
            price *= (order.Vypujcka.datum_vraceni - order.Vypujcka.datum_vypujceni).days
            res.append(dict(
                name=order.Vypujcka.nazev_akce,
                date_from=order.Vypujcka.datum_vypujceni.strftime('%d-%m-%Y'),
                date_to=order.Vypujcka.datum_vraceni.strftime('%d-%m-%Y'),
                returned='Vráceno' if order.Vypujcka.vracen else 'Nevráceno',
                orderer=str(order.Osoba.jmeno) + ' ' + str(order.Osoba.prijmeni),
                costumes=', '.join(costumes),
                accessories=', '.join(accessories),
                price=price,
                actions=render_template('orders_actions.html', id=order.Vypujcka.id),
                id=order.Vypujcka.id
            ))
        return jsonify({
                'sEcho': '1',
                'iDisplayLength': '10',
                'iTotalDisplayRecords': str(len(res)),
                'data': res
        })

def configure(app):
    app.add_url_rule('/orders-admin',
                     view_func=ManageOrders.as_view('orders-admin'))

    @app.route('/orders_edit', methods=['POST'])
    @employee
    def orders_edit():
        data = request.form
        db.update_order(**data)
        flash('Objednávka aktualizovaná', 'alert-success')
        return jsonify({})
