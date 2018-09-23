import enum
from sqlalchemy import Column, ForeignKey, PrimaryKeyConstraint, Index
from sqlalchemy import Integer, String, Text, Boolean, DateTime, Date, Enum, LargeBinary, UnicodeText, Float
from sqlalchemy.orm import relationship, backref

from web.core.db_connector import Base


class Velikosti(enum.Enum):
    s = 'S'
    m = 'M'
    l = 'L'
    xl = 'XL'
    xxl = 'XXL'
    xxxl = 'XXXL'


class Opotrebeni(enum.Enum):
    nove = 'Nové'
    stare = 'Staré'
    zanovni = 'Zánovní'


class Clenstvi(enum.Enum):
    zlate = 'Zlaté'
    stribrne = 'Stříbrné'
    bronzove = 'Bronzové'


class Doplnek(Base):
    __tablename__ = 'doplnek'

    id = Column(Integer, primary_key=True)
    nazev = Column(String(128), nullable=False)
    stari = Column(Date)
    popis_vyuziti = Column(String(512), nullable=False)
    datum_vyroby = Column(Date)
    velikost = Column(Enum(Velikosti), nullable=False)
    typ = Column(String(45))
    material = Column(String(45), nullable=False)
    pocet = Column(Integer)
    opotrebeni = Column(Enum(Opotrebeni), nullable=False)


class Barva(Base):
    __tablename__ = 'barva'

    barva = Column(String(20), nullable=False)

class Kostym(Base):
    __tablename__ = 'kostym'

    id = Column(Integer, primary_key=True)
    vyrobce = Column(String(45), nullable=False)
    material = Column(String(45), nullable=False)
    popis = Column(String(512), nullable=False)
    velikost = Column(Enum(Velikosti), nullable=False)
    stari = Column(Date, nullable=False)
    opotrebeni = Column(Enum(Opotrebeni), nullable=False)
    pocet = Column(Integer)

class Obec(Base):
    __tablename__ = 'obec'

    id = Column(Integer, primary_key=True)
    nazev = Column(String(256), nullable=False)


class Osoba(Base):
    __tablename__ = 'osoba'

    rc = Column(Integer, primary_key=True)
    jmeno = Column(String(128), nullable=False)
    prijmeni = Column(String(128), nullable=False)
    ulice = Column(String(256), nullable=False)
    cislo_popisne = Column(Integer, nullable=False)
    tel_cilo = Column(Integer)

    # obec_id


class Klient(Base):
    __tablename__ = 'klient'

    clenstvi = Column(Enum(Clenstvi), nullable=False)
     # osoba_rc


class Vypujcka(Base):
    __tablename__ = 'vypujcka'

    id = Column(Integer, primary_key=True)
    nazev_akce = Column(String(256), nullable=False)
    datum_vypujceni = Column(Date, nullable=False)
    vracen = Column(Integer, nullable=False)
    cena = Column(Integer, nullable=False)
    # klient = Column()
    # zamestnanec = Column()


class Vyuziti(Base):
    __tablename__ = 'vyuziti'

    id = Column(Integer, primary_key=True)
    druh_akce = Column(String(128))


class DoplnekBarva(Base):
    __tablename__ = 'doplnek_barva'


class BarvaKostym(Base):
    __tablename__ = 'barva_kostym'


class DoplnekVypujcka(Base):
    __tablename__ = 'doplnek_vypujcka'


class VypujckaKostym(Base):
    __tablename__ = 'vypujcka_kostym'


class KostymVyuziti(Base):
    __tablename__ = 'kostym_vyuziti'