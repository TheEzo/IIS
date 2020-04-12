import {ordersConstants} from "../_constants";

const initialState = {
    loading: true,
    myOrders: [],
    error: null,
    allOrders: [],
    cart: [],
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

        case ordersConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ordersConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                allOrders: action.orders,
            }
        case ordersConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }

        case ordersConstants.GETCART_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ordersConstants.GETCART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.cart,
            }
        case ordersConstants.GETCART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }

        default:
            return state;
    }
}