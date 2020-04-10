import {accessoriesConstants} from "../_constants/accessories.constants";
import {accessoriesService} from "../_services/accessories.service";

export const accessoriesActions = {
    getAll,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        accessoriesService.getAll()
            .then(
                accessories => dispatch(success(accessories)),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: accessoriesConstants.GETALL_REQUEST}
    }

    function success(accessories) {
        return {type: accessoriesConstants.GETALL_SUCCESS, accessories}
    }

    function failure(error) {
        return {type: accessoriesConstants.GETALL_FAILURE, error}
    }
}