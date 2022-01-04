import { carreteraGazaConstants } from '../_constants';
import { carreteraGazaService } from '../_services';
import { alertActions } from '../_actions';

export const carreteraGazaActions = {
    getOne,
    getAll,
    create
};

function getOne(pk_gaza) {
    return dispatch => {
        dispatch(request());

        carreteraGazaService.getOne(pk_gaza)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraGazaConstants.GET_ONE_REQUEST } }
    function success(payload) { return { type: carreteraGazaConstants.GET_ONE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraGazaConstants.GET_ONE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        carreteraGazaService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraGazaConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: carreteraGazaConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: carreteraGazaConstants.GET_ALL_FAILURE, error } }
}

function create(gaza) {
    return dispatch => {
        dispatch(request());

        carreteraGazaService.postSubeImagen(gaza)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraGazaConstants.CREATE_REQUEST } }
    function success(payload) { return { type: carreteraGazaConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraGazaConstants.CREATE_FAILURE, error } }
}
