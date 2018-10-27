#!/usr/bin/env python
# -*- coding: utf-8 -*-

from web.core.db_connector import session
from web.core.models import *
from werkzeug.security import generate_password_hash
import time
from flask_login import current_user


def get_user(email):
    return Osoba.query.filter_by(email=email).first()


def create_user(*args, **kwargs):
    stmt = Osoba(rc=kwargs['rc'],
                 email=kwargs['email'],
                 heslo=generate_password_hash(kwargs['password']),
                 jmeno=kwargs['jmeno'],
                 prijmeni=kwargs['prijmeni'],
                 ulice=kwargs.get('ulice'),
                 cislo_popisne=kwargs.get('cislo_popisne'),
                 tel_cislo=kwargs.get('tel_cislo'))
    session.add(stmt)
    session.commit()
    stmt = Klient(clenstvi='bronzove',
                  osoba_rc=kwargs['rc'])
    session.add(stmt)
    session.commit()


def get_employee_data(rc):
    return Zamestnanec.query.filter_by(osoba_rc=rc).first()


def add_costume(*args, **kwargs):
    stmt = Kostym(vyrobce=kwargs['vyrobce'],
                  material=kwargs['material'],
                  popis=kwargs['popis'],
                  velikost=kwargs['velikost'],
                  datum_vyroby=kwargs['datum_vyroby'],
                  opotrebeni=kwargs['opotrebeni'],
                  pocet=kwargs['pocet'])
    session.add(stmt)

    new_costume = session.query(Kostym).order_by(Kostym.id.desc()).first()

    stmt = KostymVyuziti(vyuziti_id=kwargs['vyuziti'],
                         kostym_id=new_costume.id)
    session.add(stmt)

    stmt = BarvaKostym(barva=kwargs['barva'],
                       kostym_id=new_costume.id)
    session.add(stmt)

    session.commit()


def add_accessory(*args, **kwargs):
    stmt = Doplnek(nazev=kwargs['nazev'],
                   popis_vyuziti=kwargs['popis_vyuziti'],
                   datum_vyroby=kwargs['datum_vyroby'],
                   velikost=kwargs['velikost'],
                   opotrebeni=kwargs['opotrebeni'],
                   pocet=kwargs['pocet'],
                   typ=kwargs['typ'],
                   material=kwargs['material'],
                   )
    session.add(stmt)

    new_accessory = session.query(Doplnek).order_by(Doplnek.id.desc()).first()

    stmt = DoplnekBarva(barva=kwargs['barva'],
                       doplnek_id=new_accessory.id)
    session.add(stmt)

    session.commit()


def create_order(*args, **kwargs):
    stmt = Vypujcka(nazev_akce=kwargs['nazev_akce'],
                    vracen=0,
                    datum_vypujceni=time.strftime("%d.%m.%Y"),
                    klient=current_user.get_id(),
                    zamestnanec=current_user.get_id(),
                    )
    session.add(stmt)

    new_order_id = session.query(Vypujcka).order_by(Vypujcka.id.desc()).first()


    for item in args[0]['costumes']:

        stmt = VypujckaKostym(kostym_id=item,
                                  vypujcka_id=new_order_id.id)
        session.add(stmt)

    for item in args[0]['accessories']:
        stmt = DoplnekVypujcka(doplnek_id=item,
                                  vypujcka_id=new_order_id.id)
        session.add(stmt)

    session.commit()


def get_user_orders(rc):
    return session.query(Vypujcka).filter(Vypujcka.klient == rc)\
            .all()


def get_users_data():
    return session.query(Osoba, Zamestnanec.pozice, Klient.clenstvi)\
        .outerjoin(Zamestnanec, Osoba.rc == Zamestnanec.osoba_rc)\
        .outerjoin(Klient, Osoba.rc == Klient.osoba_rc)\
        .all()


def insert_base_users():
    stmt = Osoba(rc='9609255832',
                 email='willaschek.t@gmail.com',
                 # Heslo123
                 heslo='pbkdf2:sha256:50000$qeDxpiht$e3f267714dc599d57ce7f6a10e55febb032e717d9561c1c501404c0d4c8ba9f6',
                 jmeno='Tomas',
                 prijmeni='Willaschek',
                 ulice='',
                 cislo_popisne='',
                 tel_cislo='')
    session.add(stmt)
    session.commit()
    stmt = Klient(clenstvi='bronzove',
                  osoba_rc='9609255832')
    session.add(stmt)
    stmt = Zamestnanec(osoba_rc='9609255832',
                       pozice='vedouci')
    session.add(stmt)
    session.commit()


def delete_user(rc):
    session.query(Osoba).filter(Osoba.rc==rc).delete()
    session.commit()


def update_user(**kwargs):
    session.query(Klient).filter(Klient.osoba_rc==kwargs['rc']).\
        update({'clenstvi': kwargs['membership'][0]})
    if kwargs['role'][0] == 'zakaznik':
        session.query(Zamestnanec).filter(Zamestnanec.osoba_rc == kwargs['rc'][0]).delete()
    else:
        if session.query(Zamestnanec).filter(Zamestnanec.osoba_rc == kwargs['rc']).first():
            session.query(Zamestnanec).filter(Zamestnanec.osoba_rc == kwargs['rc']). \
                update({'pozice': kwargs['role'][0]})
        else:
            stmt = Zamestnanec(osoba_rc=kwargs['rc'][0],
                               pozice=kwargs['membership'][0])
            session.add(stmt)
    session.commit()


def get_products_data(limit,offset,url):
    if(url == '/costumes_list'):
        return session.query(Kostym,Barva, Vyuziti)\
            .outerjoin(BarvaKostym, Kostym.id == BarvaKostym.kostym_id)\
            .outerjoin(Barva,BarvaKostym.barva == Barva.barva) \
            .outerjoin(KostymVyuziti, Kostym.id == KostymVyuziti.kostym_id) \
            .outerjoin(Vyuziti, Vyuziti.id == KostymVyuziti.vyuziti_id)\
            .order_by(Kostym.id.asc())\
            .limit(limit).offset(offset)
    else:
        return session.query(Doplnek, Barva)\
            .outerjoin(DoplnekBarva, Doplnek.id == DoplnekBarva.doplnek_id) \
            .outerjoin(Barva, DoplnekBarva.barva == Barva.barva) \
            .order_by(Doplnek.id.asc())\
            .limit(limit).offset(offset)

def get_product(id,type):
    if(type == "costumes"):
        return session.query(Kostym,Barva, Vyuziti)\
            .outerjoin(BarvaKostym, Kostym.id == BarvaKostym.kostym_id)\
            .outerjoin(Barva,BarvaKostym.barva == Barva.barva) \
            .outerjoin(KostymVyuziti, Kostym.id == KostymVyuziti.kostym_id) \
            .outerjoin(Vyuziti, Vyuziti.id == KostymVyuziti.vyuziti_id)\
            .filter(Kostym.id == id)
    elif(type == "accessories"):
        return session.query(Doplnek, Barva)\
            .outerjoin(DoplnekBarva, Doplnek.id == DoplnekBarva.doplnek_id) \
            .outerjoin(Barva, DoplnekBarva.barva == Barva.barva) \
            .filter(Doplnek.id == id)



def get_colors():
    return session.query(Barva)\
    .all()

def get_uses():
    return session.query(Vyuziti)\
    .all()

def get_prize(pruduct,id):
    if (pruduct == "costumes"):
        return session.query(Kostym.cena).filter_by(id=id).first()
    elif(pruduct == "accessories"):
        return session.query(Doplnek.cena).filter_by(id=id).first()


def get_user_profile(email):
    # TODO pridat objednavky
    return session.query(Osoba, Zamestnanec.pozice, Obec.nazev, Klient.clenstvi) \
        .outerjoin(Zamestnanec, Osoba.rc == Zamestnanec.osoba_rc) \
        .outerjoin(Obec, Osoba.obec_id == Obec.id) \
        .outerjoin(Klient, Osoba.rc == Klient.osoba_rc) \
        .filter(Osoba.email == email)\
        .first()