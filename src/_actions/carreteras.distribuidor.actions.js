import { carreteraDistribuidorConstants } from '../_constants';
import { carreteraDistribuidorService } from '../_services';
import { alertActions } from '../_actions';

export const carreteraDistribuidorActions = {
    getOne,
    getAll,
    create
};

function getOne(pk_distribuidor) {
    return dispatch => {
        dispatch(request());

        carreteraDistribuidorService.getOne(pk_distribuidor)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraDistribuidorConstants.GET_ONE_REQUEST } }
    function success(payload) { return { type: carreteraDistribuidorConstants.GET_ONE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraDistribuidorConstants.GET_ONE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        carreteraDistribuidorService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraDistribuidorConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: carreteraDistribuidorConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: carreteraDistribuidorConstants.GET_ALL_FAILURE, error } }
}

function create(distribuidor) {
    return dispatch => {
        dispatch(request());

        carreteraDistribuidorService.postSubeImagen(distribuidor)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraDistribuidorConstants.CREATE_REQUEST } }
    function success(payload) { return { type: carreteraDistribuidorConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraDistribuidorConstants.CREATE_FAILURE, error } }
}
