import {costumesConstants} from "../_constants/costumes.constants";

const initialState = {
    loading: true,
    items: [],
    error: null,
    editing: null,
}

export function costumes(state = initialState, action) {
    switch (action.type) {
        case costumesConstants.GETALL_REQUEST:

            return {
                ...initialState,
                loading: true,
            };
        case costumesConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.costumes,
            };
        case costumesConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case costumesConstants.SETONE_EDITING:
            const costume = state.items.filter(c => c.id == action.id);
            return{
                ...state,
                editing: costume[0],
            }
        default:
            return state;
    }
}