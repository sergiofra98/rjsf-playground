import { carreteraCarrilConstants } from '../_constants';
import { carreteraCarrilService } from '../_services';
import { alertActions } from '../_actions';

export const carreteraCarrilActions = {
    getOne,
    getAll,
    create,
    clearAll,
    delete: _delete
};

function getOne(pk_carril) {
    return dispatch => {
        dispatch(request());

        carreteraCarrilService.getOne(pk_carril)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraCarrilConstants.GET_ONE_REQUEST } }
    function success(payload) { return { type: carreteraCarrilConstants.GET_ONE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraCarrilConstants.GET_ONE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        carreteraCarrilService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraCarrilConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: carreteraCarrilConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: carreteraCarrilConstants.GET_ALL_FAILURE, error } }
}

function create(carril) {
    return dispatch => {
        dispatch(request());

        carreteraCarrilService.create(carril)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraCarrilConstants.CREATE_REQUEST } }
    function success(payload) { return { type: carreteraCarrilConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraCarrilConstants.CREATE_FAILURE, error } }
}

function _delete(pk_carril) {
    return dispatch => {
        dispatch(request());

        carreteraCarrilService.delete(pk_carril)
            .then(
                resp => dispatch(success()),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraCarrilConstants.DELETE_REQUEST } }
    function success() { return { type: carreteraCarrilConstants.DELETE_SUCCESS, id: pk_carril } }
    function failure(error) { return { type: carreteraCarrilConstants.DELETE_FAILURE, error } }
}

function clearAll() {
    return { type: carreteraCarrilConstants.CLEARALL_REQUEST };
}