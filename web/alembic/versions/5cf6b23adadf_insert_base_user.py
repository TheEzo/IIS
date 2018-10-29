"""insert base user

Revision ID: 5cf6b23adadf
Revises: 4044288fd3d0
Create Date: 2018-10-04 17:47:53.500128

"""
from alembic import op
import sqlalchemy as sa
from web.core.db import insert_base_users

# revision identifiers, used by Alembic.
revision = '5cf6b23adadf'
down_revision = '53f1e32580ae'
branch_labels = None
depends_on = None


def upgrade():
    insert_base_users()


def downgrade():
    pass
