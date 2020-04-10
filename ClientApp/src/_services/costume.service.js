import {config} from '../_helpers';
import {handleResponse, handleError} from "./responseHandlers";
import {GETOptions} from "./requestOptions";

export const costumeService = {
    getAll,
}

function getAll() {

    return fetch(config.apiUrl + '/costumes', GETOptions)
        .then(handleResponse, handleError)
        .then(d => {
            return d
        });
}
