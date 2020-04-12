from functools import wraps
from flask_login import current_user
from flask import abort, session


# role decorators
def admin(func):
    @wraps(func)
    @login_required
    def _admin(*args, **kwargs):
        if current_user.is_admin():
            return func(*args, **kwargs)
        return abort(403)
    return _admin


def employee(func):
    @wraps(func)
    @login_required
    def _employee(*args, **kwargs):
        if current_user.is_employee():
            return func(*args, **kwargs)
        return abort(403)
    return _employee


def login_required(func):
    def decorated_view(*args, **kwargs):
        if not current_user.is_authenticated():
            return abort(401)
        return func(*args, **kwargs)
    return decorated_view


def admin_or_current(func):
    @wraps(func)
    @login_required
    def _func(*args, **kwargs):
        user_id = kwargs.get('obj_id')
        if not user_id:
            user_id = session.get('user_id')
        if str(current_user.id) == str(user_id) or current_user.is_admin():
            return func(*args, **kwargs)
        return abort(403)
    return _func