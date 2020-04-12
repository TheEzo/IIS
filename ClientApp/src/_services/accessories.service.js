import {config} from '../_helpers';
import {handleResponse, handleError} from "./responseHandlers";
import {DELETEOptions, GETOptions, POSTOptions} from "./requestOptions";

export const accessoriesService = {
    getAll,
    edit,
    delete: _delete,
    create,
}

function getAll() {

    return fetch(config.apiUrl + '/accessories', GETOptions)
        .then(handleResponse, handleError)
        .then(d => {
            return d
        });
}

function edit(acc) {
    const formData = new FormData();
    formData.append('color', acc.color.toString());
    formData.append('count', acc.count.toString());
    formData.append('description', acc.description.toString());
    formData.append('id', acc.id.toString());
    formData.append('image', acc.image);
    formData.append('manufacturer', acc.manufacturer.toString());
    formData.append('material', acc.material.toString());
    formData.append('name', acc.name.toString());
    formData.append('price', acc.price.toString());
    formData.append('size', acc.size.toString());
    formData.append('wear_level', acc.wear_level.toString());

    return fetch(config.apiUrl + '/accessories', POSTOptions(formData));
}

function create(acc) {
    const formData = new FormData();
    formData.append('color', acc.color.toString());
    formData.append('count', acc.count.toString());
    formData.append('description', acc.description.toString());
    formData.append('image', acc.image);
    formData.append('manufacturer', acc.manufacturer.toString());
    formData.append('material', acc.material.toString());
    formData.append('name', acc.name.toString());
    formData.append('price', acc.price.toString());
    formData.append('size', acc.size.toString());
    formData.append('wear_level', acc.wear_level.toString());

    return fetch(config.apiUrl + '/accessories', POSTOptions(formData));
}

function _delete(id) {
    const formData = new FormData();
    formData.append('id', id.toString());

    return fetch(config.apiUrl + "/accessories", DELETEOptions(formData))
}