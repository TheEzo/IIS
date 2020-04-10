import {config} from '../_helpers';
import {handleResponse, handleError} from "./responseHandlers";
import {GETOptions} from "./requestOptions";

export const accessoriesService = {
    getAll,
}

function getAll() {

    return fetch(config.apiUrl + '/accessories', GETOptions)
        .then(handleResponse, handleError)
        .then(d => {
            return d
        });
}
