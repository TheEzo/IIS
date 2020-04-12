import {authHeader, config} from '../_helpers';
import {handleError, handleResponse} from "./responseHandlers";
import {GETOptions, POSTOptions, PUTOptions} from "./requestOptions";

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    const formData = new FormData();
    formData.append('email', email.toString());
    formData.append('password', password.toString());

    return fetch(config.apiUrl + '/login', POSTOptions(formData))
        .then(handleResponse, handleError)
        .then(user => {
            // login successful if there's a jwt token in the response
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    fetch(config.apiUrl + '/logout', GETOptions);
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    return fetch(config.apiUrl + '/users', GETOptions).then(handleResponse, handleError);
}

function getById(id) {
    return fetch(config.apiUrl + '/users/' + id, GETOptions).then(handleResponse, handleError);
}

function register(user) {
    const formData = new FormData();
    formData.append('id', user.rodne.toString());
    formData.append('name', user.name.toString());
    formData.append('surname', user.surname.toString());
    formData.append('email', user.email.toString());
    formData.append('password', user.password.toString());

    return fetch(config.apiUrl + '/users', POSTOptions(formData)).then(handleResponse, handleError);
}

function update(user) {

    const formData = new FormData();
    formData.append('id', user.id.toString());
    formData.append('name', user.name.toString());
    formData.append('surname', user.surname.toString());
    formData.append('email', user.email.toString());
    formData.append('tel_number', user.tel_number);
    formData.append('city', user.city);
    formData.append('addr_num', user.addr_num);
    formData.append('membership', user.membership);
    formData.append('position', user.position);

    const options = POSTOptions(formData)
    return fetch(config.apiUrl + '/users', options).then(handleResponse, handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users/' + id, requestOptions).then(handleResponse, handleError);
}