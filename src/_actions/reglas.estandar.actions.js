import { reglasEstandarConstants } from '../_constants';
import { reglasEstandarService } from '../_services';
import { alertActions } from '../_actions';

export const reglasEstandarActions = {
    getOne,
    getAll,
    create
};

function getOne(pk_estandar) {
    return dispatch => {
        dispatch(request());

        reglasEstandarService.getOne(pk_estandar)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: reglasEstandarConstants.GET_ONE_REQUEST } }
    function success(payload) { return { type: reglasEstandarConstants.GET_ONE_SUCCESS, payload } }
    function failure(error) { return { type: reglasEstandarConstants.GET_ONE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        reglasEstandarService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: reglasEstandarConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: reglasEstandarConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: reglasEstandarConstants.GET_ALL_FAILURE, error } }
}

function create(estandar) {
    return dispatch => {
        dispatch(request());

        reglasEstandarService.postSubeImagen(estandar)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: reglasEstandarConstants.CREATE_REQUEST } }
    function success(payload) { return { type: reglasEstandarConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: reglasEstandarConstants.CREATE_FAILURE, error } }
}
