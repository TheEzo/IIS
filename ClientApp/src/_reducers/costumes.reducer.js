import {costumesConstants} from "../_constants/costumes.constants";

const initialState = {
    loading: false,
    items: [],
    error: null,
}

export function costumes(state = initialState, action) {
    switch (action.type) {
        case costumesConstants.GETALL_REQUEST:

            return {
                ...initialState,
                loading: true,
            };
        case costumesConstants.GETALL_SUCCESS:
            console.log("Action succ: ", action);
            return {
                ...state,
                loading: false,
                items: action.costumes,
            };
        case costumesConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}