import {accessoriesConstants} from "../_constants";

const initialState = {
    loading: true,
    items: [],
    error: null,
}

export function accessories(state = initialState, action) {
    switch (action.type) {
        case accessoriesConstants.GETALL_REQUEST:

            return {
                ...initialState
            };
        case accessoriesConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.accessories,
            };
        case accessoriesConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}