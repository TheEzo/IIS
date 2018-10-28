#!/usr/bin/env python
# -*- coding: utf-8 -*-

from sqlalchemy import Column, ForeignKey, PrimaryKeyConstraint, Index
from sqlalchemy import Integer, String, Text, Boolean, DateTime, Date, Enum, LargeBinary, UnicodeText, Float

from web.core.db_connector import Base


class Doplnek(Base):
    __tablename__ = 'doplnek'

    id = Column(Integer, primary_key=True)
    nazev = Column(String(128), nullable=False)
    popis_vyuziti = Column(String(512), nullable=False)
    datum_vyroby = Column(Date)
    velikost = Column(Enum('S', 'M', 'L', 'XL', 'XXL', 'XXXL'))
    typ = Column(String(45))
    material = Column(String(45), nullable=False)
    pocet = Column(Integer)
    opotrebeni = Column(Enum(u'nove', u'stare', u'zanovni'))
    obrazek = Column(LargeBinary, nullable=True)
    cena = Column(Integer, nullable=False)
    vyrobce = Column(String(45), nullable=False)


class Barva(Base):
    __tablename__ = 'barva'

    barva = Column(String(20), primary_key=True)


class Kostym(Base):
    __tablename__ = 'kostym'

    id = Column(Integer, primary_key=True)
    nazev = Column(String(128), nullable=False)
    vyrobce = Column(String(45), nullable=False)
    material = Column(String(45), nullable=False)
    popis = Column(String(512), nullable=False)
    velikost = Column(Enum('S', 'M', 'L', 'XL', 'XXL', 'XXXL'))
    datum_vyroby = Column(Date, nullable=False)
    opotrebeni = Column(Enum(u'nove', u'stare', u'zanovni'))
    pocet = Column(Integer)
    obrazek = Column(LargeBinary, nullable=True)
    cena = Column(Integer, nullable=False)


class Osoba(Base):
    __tablename__ = 'osoba'

    rc = Column(String(10), primary_key=True)
    email = Column(String(200), nullable=False, unique=True)
    heslo = Column(String(256), nullable=False)
    jmeno = Column(String(128), nullable=False)
    prijmeni = Column(String(128), nullable=False)
    ulice = Column(String(256), nullable=True)
    cislo_popisne = Column(String(10), nullable=True)
    obec = Column(String(60), nullable=True)
    tel_cislo = Column(String(10))


class Klient(Base):
    __tablename__ = 'klient'
    __table_args__ = (PrimaryKeyConstraint('osoba_rc',),)

    clenstvi = Column(Enum('zlate', 'stribrne', 'bronzove'))

    osoba_rc = Column(String(10), ForeignKey('osoba.rc', ondelete='CASCADE'))


class Zamestnanec(Base):
    __tablename__ = 'zamestnanec'
    __table_args__ = (PrimaryKeyConstraint('osoba_rc',),)

    pozice = Column(Enum('zamestnanec', 'vedouci'))

    osoba_rc = Column(String(10), ForeignKey('osoba.rc', ondelete='CASCADE'))


class Vypujcka(Base):
    __tablename__ = 'vypujcka'

    id = Column(Integer, primary_key=True)
    nazev_akce = Column(String(256), nullable=False)
    datum_vypujceni = Column(Date, nullable=False)
    vracen = Column(Integer, nullable=False)

    klient = Column(String(10), ForeignKey('osoba.rc', ondelete='CASCADE'))
    zamestnanec = Column(String(10), ForeignKey('osoba.rc', ondelete='CASCADE'))


class Vyuziti(Base):
    __tablename__ = 'vyuziti'

    id = Column(Integer, primary_key=True)
    druh_akce = Column(String(128))


class DoplnekBarva(Base):
    __tablename__ = 'doplnek_barva'
    __table_args__ = (PrimaryKeyConstraint('doplnek_id', 'barva'),)

    doplnek_id = Column(Integer, ForeignKey('doplnek.id', ondelete='CASCADE'))
    barva = Column(String(20), ForeignKey('barva.barva', ondelete='CASCADE'))


class BarvaKostym(Base):
    __tablename__ = 'barva_kostym'
    __table_args__ = (PrimaryKeyConstraint('kostym_id', 'barva'),)

    kostym_id = Column(Integer, ForeignKey('kostym.id', ondelete='CASCADE'))
    barva = Column(String(20), ForeignKey('barva.barva', ondelete='CASCADE'))


class DoplnekVypujcka(Base):
    __tablename__ = 'doplnek_vypujcka'
    __table_args__ = (PrimaryKeyConstraint('doplnek_id', 'vypujcka_id'),)

    doplnek_id = Column(Integer, ForeignKey('doplnek.id', ondelete='CASCADE'))
    vypujcka_id = Column(Integer, ForeignKey('vypujcka.id', ondelete='CASCADE'))


class VypujckaKostym(Base):
    __tablename__ = 'vypujcka_kostym'
    __table_args__ = (PrimaryKeyConstraint('vypujcka_id', 'kostym_id'),)

    vypujcka_id = Column(Integer, ForeignKey('vypujcka.id', ondelete='CASCADE'))
    kostym_id = Column(Integer, ForeignKey('kostym.id', ondelete='CASCADE'))


class KostymVyuziti(Base):
    __tablename__ = 'kostym_vyuziti'
    __table_args__ = (PrimaryKeyConstraint('kostym_id', 'vyuziti_id'),)

    kostym_id = Column(Integer, ForeignKey('kostym.id', ondelete='CASCADE'))
    vyuziti_id = Column(Integer, ForeignKey('vyuziti.id', ondelete='CASCADE'))
