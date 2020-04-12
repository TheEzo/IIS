import {config} from '../_helpers';
import {handleResponse, handleError} from "./responseHandlers";
import {GETOptions, POSTOptions} from "./requestOptions";

export const accessoriesService = {
    getAll,
    edit,
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
    formData.append('image', acc.image.toString());
    formData.append('manufacturer', acc.manufacturer.toString());
    formData.append('material', acc.material.toString());
    formData.append('name', acc.name.toString());
    formData.append('price', acc.price.toString());
    formData.append('size', acc.size.toString());
    formData.append('wear_level', acc.wear_level.toString());

    return fetch(config.apiUrl + '/accessories', POSTOptions(formData));
}