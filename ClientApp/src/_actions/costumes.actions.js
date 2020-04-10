import {costumesConstants} from "../_constants/costumes.constants";
import {costumeService} from "../_services/costume.service";

export const costumesActions = {
    getAll,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        costumeService.getAll()
            .then(
                costumes => dispatch(success(costumes)),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: costumesConstants.GETALL_REQUEST}
    }

    function success(costumes) {
        return {type: costumesConstants.GETALL_SUCCESS, costumes}
    }

    function failure(error) {
        return {type: costumesConstants.GETALL_FAILURE, error}
    }
}