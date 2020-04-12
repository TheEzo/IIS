import {config} from '../_helpers';
import {handleResponse, handleError} from "./responseHandlers";
import {GETOptions, POSTOptions} from "./requestOptions";

export const costumeService = {
    getAll,
    edit,
}

function getAll() {

    return fetch(config.apiUrl + '/costumes', GETOptions)
        .then(handleResponse, handleError)
        .then(costumes => {
            return costumes
        });
}

function edit(costume) {
    //TODO
    return fetch(config.apiUrl + '/costumes', POSTOptions(null));
}