import {config} from "../_helpers";
import {handleResponse, handleError} from "./responseHandlers";
import {DELETEOptions, GETOptions, POSTOptions} from "./requestOptions";

export const orderService = {
    getMine,
    deleteOrder,
    getAll,
    getCart,
    returnItem,
    addToCart,
    makeOrder,
}

function returnItem(id) {
    const formData = new FormData();
    formData.append('id', id.toString());
    return fetch(config.apiUrl + "/orders_admin", POSTOptions(formData));

}

function makeOrder(order) {
    const date = new Date(order.orderDate);
    const strDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

    const formData = new FormData();
    formData.append('return_date', strDate.toString());
    formData.append('name', order.orderName.toString());
    return fetch(config.apiUrl + "/cart", POSTOptions(formData));
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

function getCart() {
    return fetch(config.apiUrl + "/cart", GETOptions)
        .then(handleResponse, handleError)
        .then(cart => {return cart});
}

function addToCart(id, type, action) {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('item', type);
    formData.append('action', action);

    return fetch(config.apiUrl + "/cart_manage", POSTOptions(formData));

}