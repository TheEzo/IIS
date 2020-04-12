import {ordersConstants} from "../_constants";
import {orderService} from "../_services";
import {alertActions} from "./alert.actions";
import {history} from '../_helpers';

export const orderActions = {
    getMine,
    deleteOrder,
    getAll,
    getCart,
    returnItem,
    addToCart,
    makeOrder,
}

function getMine() {
    return dispatch => {
        dispatch(request())

        orderService.getMine()
            .then(
                orders => dispatch(success(orders)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                },
            )
    }

    function request() {
        return {type: ordersConstants.GETMINE_REQUEST}
    }

    function success(orders) {
        return {type: ordersConstants.GETMINE_SUCCESS, orders}
    }

    function failure(error) {
        return {type: ordersConstants.GETMINE_FAILURE, error}
    }
}

function deleteOrder(id) {
}

function getAll() {
    return dispatch => {
        dispatch(request())

        orderService.getAll()
            .then(
                orders => dispatch(success(orders)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                },
            )
    }

    function request() {
        return {type: ordersConstants.GETALL_REQUEST}
    }

    function success(orders) {
        return {type: ordersConstants.GETALL_SUCCESS, orders}
    }

    function failure(error) {
        return {type: ordersConstants.GETALL_FAILURE, error}
    }
}

function getCart() {
    return dispatch => {
        dispatch(request())

        orderService.getCart()
            .then(
                orders => dispatch(success(orders)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                },
            )
    }

    function request() {
        return {type: ordersConstants.GETCART_REQUEST}
    }

    function success(cart) {
        return {type: ordersConstants.GETCART_SUCCESS, cart}
    }

    function failure(error) {
        return {type: ordersConstants.GETCART_FAILURE, error}
    }
}

function returnItem(id) {
    return dispatch => {
        orderService.returnItem(id)
            .then(() => {
                history.push("/adminOrders");
                dispatch(orderActions.getAll());
                dispatch(alertActions.success("Objednávka byla vrácena"));
            })
            .catch(() => {
                dispatch(alertActions.error("Nepodařilo se zpracovat objednávku"));
            });
    }

}

function addToCart(id, type, action) {
    return dispatch => {
        orderService.addToCart(id, type, action)
            .then(() => {
                if (action === "add")
                    dispatch(alertActions.success("Přidáno do košíku"));
                else
                    dispatch(alertActions.success("Odebráno z košíku"));

                dispatch(orderActions.getCart());
            })
            .catch(() => {
                dispatch(alertActions.error("Nepodařilo se zpracovat požadavek"));
            })
    }
}

function makeOrder(order) {
    return dispatch => {
        orderService.makeOrder(order)
            .then(() => {
                dispatch(alertActions.success("Rezervace byla vytvořena"));
                history.push("/orderHistory")
            })
            .catch(() => {
                dispatch(alertActions.error("Nepodařilo se zpracovat požadavek"));
            });
    }

}