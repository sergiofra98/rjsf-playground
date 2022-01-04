import { carreteraSentidoConstants } from '../_constants';
import { carreteraSentidoService } from '../_services';
import { alertActions } from '../_actions';

export const carreteraSentidoActions = {
    getOne,
    getAll,
    create
};

function getOne(pk_sentido) {
    return dispatch => {
        dispatch(request());

        carreteraSentidoService.getOne(pk_sentido)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraSentidoConstants.GET_ONE_REQUEST } }
    function success(payload) { return { type: carreteraSentidoConstants.GET_ONE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraSentidoConstants.GET_ONE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        carreteraSentidoService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraSentidoConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: carreteraSentidoConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: carreteraSentidoConstants.GET_ALL_FAILURE, error } }
}

function create(sentido) {
    return dispatch => {
        dispatch(request());

        carreteraSentidoService.postSubeImagen(sentido)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraSentidoConstants.CREATE_REQUEST } }
    function success(payload) { return { type: carreteraSentidoConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraSentidoConstants.CREATE_FAILURE, error } }
}
