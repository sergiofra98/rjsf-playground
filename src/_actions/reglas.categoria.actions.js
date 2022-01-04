import { reglasCategoriaConstants } from '../_constants';
import { reglasCategoriaService } from '../_services';
import { alertActions } from '../_actions';

export const reglasCategoriaActions = {
    getOne,
    getAll,
    create
};

function getOne(pk_categoria) {
    return dispatch => {
        dispatch(request());

        reglasCategoriaService.getOne(pk_categoria)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: reglasCategoriaConstants.GET_ONE_REQUEST } }
    function success(payload) { return { type: reglasCategoriaConstants.GET_ONE_SUCCESS, payload } }
    function failure(error) { return { type: reglasCategoriaConstants.GET_ONE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        reglasCategoriaService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: reglasCategoriaConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: reglasCategoriaConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: reglasCategoriaConstants.GET_ALL_FAILURE, error } }
}

function create(categoria) {
    return dispatch => {
        dispatch(request());

        reglasCategoriaService.postSubeImagen(categoria)
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: reglasCategoriaConstants.CREATE_REQUEST } }
    function success(payload) { return { type: reglasCategoriaConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: reglasCategoriaConstants.CREATE_FAILURE, error } }
}
