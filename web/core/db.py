#!/usr/bin/env python
# -*- coding: utf-8 -*-

from web.core.db_connector import session
from web.core.models import *
from werkzeug.security import generate_password_hash
import time
from flask_login import current_user
from datetime import datetime
from collections import Counter




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



def update_users_data(data):
    user = session.query(Osoba).filter(Osoba.rc == data['rc']).first()

    user.jmeno = data['jmeno']
    user.prijmeni = data['prijmeni']
    user.obec = data['obec']
    user.ulice = data['ulice']
    user.cislo_popisne = data['cislo_popisne']
    user.tel_cislo = data['tel_cislo']
    user.email = data['email']

    session.commit()


def get_employee_data(rc):
    return Zamestnanec.query.filter_by(osoba_rc=rc).first()


def get_costume_by_id(id):
    return Kostym.query.filter_by(id=id).first()


def get_accessory_by_id(id):
    return Doplnek.query.filter_by(id=id).first()


# def get_costume_color(id):
#     return BarvaKostym.query.filter_by(kostym_id=id).all()


def get_costume_usage(id):
    return KostymVyuziti.query.filter_by(kostym_id=id).all()

def add_or_update_costume(image, *args, **kwargs):
    id = kwargs.get('id', None)
    cz_datetime = datetime.strptime(kwargs['datum_vyroby'], '%d.%m.%Y')
    costume = Kostym.query.filter_by(id=id).first()
    if not costume:
        costume = Kostym(nazev=kwargs['nazev'],
                         vyrobce=kwargs['vyrobce'],
                         material=kwargs['material'],
                         popis=kwargs['popis'],
                         velikost=kwargs['velikost'],
                         datum_vyroby=cz_datetime.strftime("%Y-%m-%d"),
                         opotrebeni=kwargs['opotrebeni'],
                         pocet=kwargs['pocet'],
                         cena=kwargs['cena'],
                         obrazek=image,
                         barva=kwargs['barva'])
        session.add(costume)
        costume = session.query(Kostym).order_by(Kostym.id.desc()).first()

    else:
        costume.nazev = kwargs['nazev']
        costume.vyrobce = kwargs['vyrobce']
        costume.material = kwargs['material']
        costume.popis = kwargs['popis']
        costume.velikost = kwargs['velikost']
        costume.datum_vyroby = cz_datetime.strftime("%Y-%m-%d")
        costume.opotrebeni = kwargs['opotrebeni']
        costume.pocet = kwargs['pocet']
        costume.cena = kwargs['cena']
        if image:
            costume.obrazek = image
        session.add(costume)

        session.query(KostymVyuziti).filter_by(kostym_id=costume.id).delete()

    for usage in kwargs['vyuziti']:
        session.add(KostymVyuziti(vyuziti_id=usage, kostym_id=costume.id))
    session.commit()

def get_usages():
    return session.query(Vyuziti).all()


def add_accessory(image, *args, **kwargs):
    id = kwargs.get('id', None)
    cz_datetime = datetime.strptime(kwargs['datum_vyroby'], '%d.%m.%Y')
    accessory = Doplnek.query.filter_by(id=id).first()
    if not accessory:
        stmt = Doplnek(nazev=kwargs['nazev'],
                       vyrobce=kwargs['vyrobce'],
                       popis_vyuziti=kwargs['popis_vyuziti'],
                       datum_vyroby=cz_datetime.strftime("%Y-%m-%d"),
                       velikost=kwargs['velikost'],
                       opotrebeni=kwargs['opotrebeni'],
                       pocet=kwargs['pocet'],
                       typ=kwargs['typ'],
                       material=kwargs['material'],
                       cena=kwargs['cena'],
                       obrazek=image,
                       barva=kwargs['barva']
                       )
        session.add(stmt)

    else:
        accessory.nazev = kwargs['nazev']
        accessory.vyrobce = kwargs['vyrobce']
        accessory.popis_vyuziti = kwargs['popis_vyuziti']
        accessory.datum_vyroby = cz_datetime.strftime("%Y-%m-%d")
        accessory.velikost = kwargs['velikost']
        accessory.opotrebeni = kwargs['opotrebeni']
        accessory.pocet = kwargs['pocet']
        accessory.typ = kwargs['typ']
        accessory.material = kwargs['material']
        accessory.cena = kwargs['cena']
        accessory.barva = kwargs['barva']
        if image:
            accessory.obrazek = image
    session.commit()


def create_order(*args, **kwargs):
    cz_datetime = datetime.strptime(kwargs['datum_vraceni'], '%d.%m.%Y')
    stmt = Vypujcka(nazev_akce=kwargs['nazev_akce'],
                    vracen=0,
                    datum_vypujceni=time.strftime("%Y-%m-%d"),
                    datum_vraceni=cz_datetime.strftime("%Y-%m-%d"),
                    klient=current_user.get_id(),
                    zamestnanec=current_user.get_id(),
                    )
    session.add(stmt)

    new_order_id = session.query(Vypujcka).order_by(Vypujcka.id.desc()).first()

    costumes_occurences = Counter(args[0]['costumes'])

    for item, occurence in costumes_occurences.items():

        stmt = VypujckaKostym(kostym_id=item,
                              vypujcka_id=new_order_id.id,
                              pocet=occurence)
        costume = session.query(Kostym).filter_by(id=item).first()
        costume.pocet -= occurence
        session.add(costume)
        session.add(stmt)

    accessories_occurences = Counter(args[0]['accessories'])

    for item,occurence in accessories_occurences.items():
        stmt = DoplnekVypujcka(doplnek_id=item,
                               vypujcka_id=new_order_id.id,
                               pocet=occurence)
        session.add(stmt)
        accessoory = session.query(Doplnek).filter_by(id=item).first()
        accessoory.pocet -= occurence
        session.add(accessoory)

    session.commit()

def get_costume_order(id):
    return session.query(VypujckaKostym, Vypujcka).outerjoin(Vypujcka, Vypujcka.id == VypujckaKostym.vypujcka_id)\
        .filter(VypujckaKostym.kostym_id == id).first()


def get_user_orders(rc):
    return (session.query(Vypujcka).filter(Vypujcka.klient == rc),
            session.query(VypujckaKostym, Kostym).outerjoin(Kostym, VypujckaKostym.kostym_id == Kostym.id).all(),
            session.query(DoplnekVypujcka, Doplnek).outerjoin(Doplnek, DoplnekVypujcka.doplnek_id == Doplnek.id).all())


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
                 obec='',
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

    stmt = Osoba(rc='9610086548',
                 email='domino.ruta@gmail.com',
                 # Heslo123
                 heslo='pbkdf2:sha256:50000$R1EGLREp$17c8154b3817009d26f14456dc54ae89f041e500c43ca011ecd5133c0763febf',
                 jmeno='Dominik',
                 prijmeni='Ruta',
                 ulice='',
                 obec='',
                 cislo_popisne='',
                 tel_cislo='')
    session.add(stmt)
    session.commit()
    stmt = Klient(clenstvi='bronzove',
                  osoba_rc='9610086548')
    session.add(stmt)
    stmt = Zamestnanec(osoba_rc='9610086548',
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
                               pozice=kwargs['role'][0])
            session.add(stmt)
    session.commit()


def get_products_data(limit,offset,url):
    if(url == '/costumes_list'):
        return (session.query(Kostym).order_by(Kostym.id.asc()).limit(limit).offset(offset).all(),
                session.query(Vyuziti, KostymVyuziti).outerjoin(KostymVyuziti, KostymVyuziti.vyuziti_id == Vyuziti.id).all())
    else:
        return (session.query(Doplnek).order_by(Doplnek.id.asc()).limit(limit).offset(offset).all())

def get_product(id, type):
    if(type == "costumes"):
        return session.query(Kostym)\
            .filter(Kostym.id == id).first()
    elif(type == "accessories"):
        return session.query(Doplnek)\
            .filter(Doplnek.id == id).first()

def update_product_amount(id,amount,type):
    if type == "costume":
        costume = session.query(Kostym) \
            .filter(Kostym.id == id).first()
        costume.pocet = amount
        session.commit()
    elif type == "accessory":
        accessory = session.query(Doplnek) \
            .filter(Doplnek.id == id).first()
        accessory.pocet = amount
        session.commit()

def get_costumes_data():
    return (session.query(Kostym).all())

def get_accessories_data():
    return (session.query(Doplnek).all())

def delete_costume(id):
    if id:
        session.query(Kostym).filter_by(id=id).delete()
    session.commit()

def delete_accessory(id):
    if id:
        session.query(Doplnek).filter_by(id=id).delete()
    session.commit()

def get_product_amount(type,id):
    if (type == "costumes"):
        return session.query(Kostym.pocet) \
            .filter(Kostym.id == id).first()
    elif (type == "accessories"):
        return session.query(Doplnek.pocet) \
            .filter(Doplnek.id == id).first()

def set_product_amount(type,id,amount):
    if (type == "costumes"):
        update_costume = session.query(Kostym)\
            .filter(Kostym.id == id).first()
        update_costume.pocet = amount
        session.commit()
    elif (type == "accessories"):
        update_costume = session.query(Doplnek) \
            .filter(Doplnek.id == id).first()
        update_costume.pocet = amount
        session.commit()

def get_uses():
    return session.query(Vyuziti).all()

def get_use(use):
    return session.query(Vyuziti).filter_by(druh_akce=use).first()

def insert_use(*args,**kwargs):
    stmt = Vyuziti(druh_akce=kwargs['vyuziti'])
    session.add(stmt)
    session.commit()


def get_prize(pruduct,id):
    if pruduct == "costumes":
        return session.query(Kostym.cena).filter_by(id=id).first()
    elif pruduct == "accessories":
        return session.query(Doplnek.cena).filter_by(id=id).first()


def get_user_profile(email):
    # TODO pridat objednavky
    return session.query(Osoba, Zamestnanec.pozice, Klient.clenstvi) \
        .outerjoin(Zamestnanec, Osoba.rc == Zamestnanec.osoba_rc) \
        .outerjoin(Klient, Osoba.rc == Klient.osoba_rc) \
        .filter(Osoba.email == email)\
        .first()



def get_all_orders():
    return (
        session.query(Vypujcka, Osoba).outerjoin(Osoba, Vypujcka.klient == Osoba.rc).all(),
        session.query(VypujckaKostym, Kostym).outerjoin(Kostym, VypujckaKostym.kostym_id == Kostym.id).all(),
        session.query(DoplnekVypujcka, Doplnek)\
            .outerjoin(Doplnek, DoplnekVypujcka.doplnek_id == Doplnek.id).all()
    )

def update_order(**kwargs):
    order = session.query(Vypujcka).filter_by(id=kwargs['id'][0]).first()
    order.vracen = kwargs['returned'][0]
    session.commit()

def get_order_products(id):
    return (session.query(VypujckaKostym).filter(VypujckaKostym.vypujcka_id == id).all(),
            session.query(DoplnekVypujcka).filter(DoplnekVypujcka.vypujcka_id == id).all()
            )


def delete_order(id):
    session.query(Vypujcka).filter(Vypujcka.id == id).delete()
    session.commit()
