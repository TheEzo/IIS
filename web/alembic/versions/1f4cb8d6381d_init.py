"""'init'

Revision ID: 1f4cb8d6381d
Revises: 
Create Date: 2018-09-29 13:03:39.049000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1f4cb8d6381d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('klient',
    sa.Column('clenstvi', sa.Enum('zlate', 'stribrne', 'bronzove'), nullable=True),
    sa.Column('osoba_rc', sa.String(length=10), nullable=False),
    sa.ForeignKeyConstraint(['osoba_rc'], ['osoba.rc'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('osoba_rc')
    )
    op.create_table('vypujcka',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nazev_akce', sa.String(length=256), nullable=False),
    sa.Column('datum_vypujceni', sa.Date(), nullable=False),
    sa.Column('vracen', sa.Integer(), nullable=False),
    sa.Column('cena', sa.Integer(), nullable=False),
    sa.Column('klient', sa.String(length=10), nullable=True),
    sa.Column('zamestnanec', sa.String(length=10), nullable=True),
    sa.ForeignKeyConstraint(['klient'], ['osoba.rc'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['zamestnanec'], ['osoba.rc'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('zamestnanec',
    sa.Column('pozice', sa.Enum('zamestnanec', 'vedouci'), nullable=True),
    sa.Column('osoba_rc', sa.String(length=10), nullable=False),
    sa.ForeignKeyConstraint(['osoba_rc'], ['osoba.rc'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('osoba_rc')
    )
    op.create_table('doplnek_vypujcka',
    sa.Column('doplnek_id', sa.Integer(), nullable=False),
    sa.Column('vypujcka_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['doplnek_id'], ['doplnek.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['vypujcka_id'], ['vypujcka.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('doplnek_id', 'vypujcka_id')
    )
    op.create_table('vypujcka_kostym',
    sa.Column('vypujcka_id', sa.Integer(), nullable=False),
    sa.Column('kostym_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['kostym_id'], ['kostym.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['vypujcka_id'], ['vypujcka.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('vypujcka_id', 'kostym_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('vypujcka_kostym')
    op.drop_table('doplnek_vypujcka')
    op.drop_table('zamestnanec')
    op.drop_table('vypujcka')
    op.drop_table('klient')
    # ### end Alembic commands ###
