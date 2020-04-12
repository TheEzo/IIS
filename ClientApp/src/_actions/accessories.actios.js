import {accessoriesConstants} from "../_constants/accessories.constants";
import {accessoriesService} from "../_services/accessories.service";
import {alertActions} from "./alert.actions";
import {costumesConstants} from "../_constants/costumes.constants";
import {history} from "../_helpers";

export const accessoriesActions = {
    getAll,
    deleteAcc,
    setEdit,
    edit,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        accessoriesService.getAll()
            .then(
                accessories => dispatch(success(accessories)),
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.error(error));
                }
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

function deleteAcc(id) {
    return dispatch => {
        console.log("Delete acc id: ", id);

    }
}

function setEdit(id) {
    return dispatch => {
        dispatch({type: accessoriesConstants.SETONE_EDITING, id});
        history.push("/editAccessorie/" + id);
    };
}

function edit(acc) {
    return dispatch => {
        accessoriesService.edit(acc)
            .then(() => {
                history.push("adminAccessories");
                dispatch(alertActions.success("Doplněk byl upraven"));
            })
    }
}