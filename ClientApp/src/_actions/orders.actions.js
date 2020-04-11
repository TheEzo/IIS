import {ordersConstants} from "../_constants";
import {orderService} from "../_services";

export const orderActions = {
    getMine,
}

function getMine() {
    return dispatch => {
        dispatch(request())

        orderService.getMine()
            .then(
                orders => dispatch(success(orders)),
                error => dispatch(failure(error)),
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
