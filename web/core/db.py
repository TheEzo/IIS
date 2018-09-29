#!/usr/bin/env python
# -*- coding: utf-8 -*-

from web.core.db_connector import session
from web.core.models import *


def get_user(email, password):
    return Osoba.query.filter_by(email=email, heslo=password).first()

def create_user(*args, **kwargs):
    from web.core.login import hash_password
    stmt = Osoba(rc=kwargs['rc'],
                 email=kwargs['email'],
                 heslo=hash_password(kwargs['password']),
                 jmeno=kwargs['jmeno'],
                 prijmeni=kwargs['prijmeni'],
                 ulice=kwargs.get('ulice'),
                 cislo_popisne=kwargs.get('cislo_popisne'),
                 tel_cilo=kwargs.get('tel_cislo'))
    session.add(stmt)
    session.commit()
