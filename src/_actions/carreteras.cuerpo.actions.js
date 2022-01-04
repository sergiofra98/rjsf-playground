import { carreteraCuerpoConstants } from '../_constants';
import { carreteraCuerpoService } from '../_services';
import { alertActions } from '../_actions';

export const carreteraCuerpoActions = {
    getOne,
    getAll,
    create
};

function getOne(pk_cuerpo) {
    return dispatch => {
        dispatch(request());

        carreteraCuerpoService.getOne(pk_cuerpo)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraCuerpoConstants.GET_ONE_REQUEST } }
    function success(payload) { return { type: carreteraCuerpoConstants.GET_ONE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraCuerpoConstants.GET_ONE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        carreteraCuerpoService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraCuerpoConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: carreteraCuerpoConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: carreteraCuerpoConstants.GET_ALL_FAILURE, error } }
}

function create(cuerpo) {
    return dispatch => {
        dispatch(request());

        carreteraCuerpoService.postSubeImagen(cuerpo)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraCuerpoConstants.CREATE_REQUEST } }
    function success(payload) { return { type: carreteraCuerpoConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraCuerpoConstants.CREATE_FAILURE, error } }
}

function clearAll() {
    return { type: carreteraCarrilConstants.CLEARALL_REQUEST };
}