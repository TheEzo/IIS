from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine('mysql://root:root@localhost/iis?charset=utf8',
                       pool_recycle=3600)
session = scoped_session(sessionmaker(autocommit=False,
                                      autoflush=True,
                                      bind=engine))
