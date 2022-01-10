import { carreteraSegmentoConstants } from '../_constants';
import { carreteraSegmentoService } from '../_services';
import { alertActions } from '../_actions';

export const carreteraSegmentoActions = {
    getOne,
    getAll,
    create,
};

function getOne(pk_segmento) {
    return dispatch => {
        dispatch(request());

        carreteraSegmentoService.getOne(pk_segmento)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraSegmentoConstants.GET_ONE_REQUEST } }
    function success(payload) { return { type: carreteraSegmentoConstants.GET_ONE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraSegmentoConstants.GET_ONE_FAILURE, error } }
}



function getAll() {
    return dispatch => {
        dispatch(request());

        carreteraSegmentoService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraSegmentoConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: carreteraSegmentoConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: carreteraSegmentoConstants.GET_ALL_FAILURE, error } }
}

function create(segmento) {
    return dispatch => {
        dispatch(request());

        carreteraSegmentoService.postSubeImagen(segmento)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraSegmentoConstants.CREATE_REQUEST } }
    function success(payload) { return { type: carreteraSegmentoConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: carreteraSegmentoConstants.CREATE_FAILURE, error } }
}
