import {config} from "../_helpers";
import {handleResponse, handleError} from "./responseHandlers";
import {GETOptions} from "./requestOptions";

export const orderService = {
    getMine,
    deleteOrder,
    getAll,
}

function getMine() {
    return fetch(config.apiUrl + "/orders", GETOptions)
        .then(handleResponse, handleError)
        .then(orders => {
            return orders
        });
}

function deleteOrder(id) {
    const options = {
        ...GETOptions,
        method: "DELETE",
    }

    //TODO: dělej
    return fetch(config.apiUrl + "/orders/" + id)
        .then(handleResponse, handleError)
        .then()
}

function getAll() {
    return fetch(config.apiUrl + "/orders_admin", GETOptions)
        .then(handleResponse, handleError)
        .then(orders => {return orders});
}