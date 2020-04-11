import {ordersConstants} from "../_constants";
import {orderService} from "../_services";
import {alertActions} from "./alert.actions";

export const orderActions = {
    getMine,
    deleteOrder,
    getAll,
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
    console.log("Odstranuji order id:", id);
    //TODO: dělej!
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
