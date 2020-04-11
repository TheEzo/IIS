import {config} from "../_helpers";
import {handleResponse, handleError} from "./responseHandlers";
import {GETOptions} from "./requestOptions";

export const orderService = {
    getMine,
}

function getMine() {
    return fetch(config.apiUrl + "/orders", GETOptions)
        .then(handleResponse, handleError)
        .then(orders => {
            return orders
        });
}