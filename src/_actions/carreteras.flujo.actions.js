import { carreteraFlujoConstants } from '../_constants';
import { carreteraFlujoService } from '../_services';
import { alertActions } from '../_actions';

export const carreteraFlujoActions = {
    getOne,
    getAll,
    create
};

function getOne(pk_flujo) {
    return dispatch => {
        dispatch(request());

        carreteraFlujoService.getOne(pk_flujo)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraFlujoConstants.GET_ONE_REQUEST } }
    function success(payload) { return { type: carreteraFlujoConstants.GET_ONE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraFlujoConstants.GET_ONE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        carreteraFlujoService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraFlujoConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: carreteraFlujoConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: carreteraFlujoConstants.GET_ALL_FAILURE, error } }
}

function create(flujo) {
    return dispatch => {
        dispatch(request());

        carreteraFlujoService.postSubeImagen(flujo)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraFlujoConstants.CREATE_REQUEST } }
    function success(payload) { return { type: carreteraFlujoConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraFlujoConstants.CREATE_FAILURE, error } }
}
