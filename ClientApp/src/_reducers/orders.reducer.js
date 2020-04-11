import {ordersConstants} from "../_constants";

const initialState = {
    loading: true,
    myOrders: [],
    error: null,
    allOrders: [],
}

export function orders(state = initialState, action) {
    switch (action.type) {
        case ordersConstants.GETMINE_REQUEST:
            return initialState;
        case ordersConstants.GETMINE_SUCCESS:
            return {
                ...initialState,
                loading: false,
                myOrders: action.orders
            }
        case ordersConstants.GETMINE_FAILURE:
            return {
                ...initialState,
                error: action.error,
            }
        default:
            return state;
    }
}