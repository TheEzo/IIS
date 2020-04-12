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

    const formData = new FormData();
    formData.append('color', costume.color.toString());
    formData.append('count', costume.count.toString());
    formData.append('description', costume.description.toString());
    formData.append('id', costume.id.toString());
    formData.append('image', costume.image.toString());
    formData.append('manufacturer', costume.manufacturer.toString());
    formData.append('material', costume.material.toString());
    formData.append('name', costume.name.toString());
    formData.append('price', costume.price.toString());
    formData.append('size', costume.size.toString());
    formData.append('wear_level', costume.wear_level.toString());

    return fetch(config.apiUrl + '/costumes', POSTOptions(formData));
}