import {costumesConstants} from "../_constants/costumes.constants";
import {costumeService} from "../_services/costume.service";
import {alertActions} from "./alert.actions";
import {history} from '../_helpers';

export const costumesActions = {
    getAll,
    setEdit,
    edit,
    delete: _delete,
    create,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        costumeService.getAll()
            .then(
                costumes => dispatch(success(costumes)),
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.error(error));
                }
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

function setEdit(id) {
    return dispatch => {
        dispatch({type: costumesConstants.SETONE_EDITING, id});
        history.push("/editCostume/" + id);
    };
}

function edit(costume){
    return dispatch => {
        costumeService.edit(costume)
            .then(() => {
                history.push("/adminCostumes");
                dispatch(alertActions.success("Kostým byl upraven"));
            })
    }
}

function _delete(id){
    return dispatch => {
        costumeService.delete(id)
            .then(() => {
                history.push("/adminCostumes");
                dispatch(costumesActions.getAll());
                dispatch(alertActions.success("Kostým byl odstraněn"));
            })
    }
}

function create(item) {
    return  dispatch => {
        costumeService.create(item)
            .then(() => {
                history.push("/adminCostumes");
                dispatch(alertActions.success("Kostým byl přidán"));
            })
    }

}