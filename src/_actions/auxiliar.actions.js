import { auxiliarConstants } from '../_constants';
import { auxiliarService } from '../_services';
import { alertActions } from '../_actions';

export const auxiliarActions = {
    getFormIncidencia,
    getFormAtencion,
    getCatalogoFlujo,
    getFormPavimentoProyeccion,
    getFormPavimentoHistorico,
    getFormQueryCadenamiento,
    getInicio
};

function getFormQueryCadenamiento(params = {}) {
    return dispatch => {
        dispatch(request());

        auxiliarService.getFormQueryCadenamiento(params)
            .then(
                form => dispatch(success(form.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: auxiliarConstants.GET_FORM_QUERY_CADENAMIENTO_REQUEST } }
    function success(payload) { return { type: auxiliarConstants.GET_FORM_QUERY_CADENAMIENTO_SUCCESS, payload } }
    function failure(error) { return { type: auxiliarConstants.GET_FORM_QUERY_CADENAMIENTO_FAILURE, error } }
}

function getFormIncidencia() {
    return dispatch => {
        dispatch(request());

        auxiliarService.getFormIncidencia()
            .then(
                form => dispatch(success(form.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: auxiliarConstants.GET_FORM_INCIDENCIA_REQUEST } }
    function success(payload) { return { type: auxiliarConstants.GET_FORM_INCIDENCIA_SUCCESS, payload } }
    function failure(error) { return { type: auxiliarConstants.GET_FORM_INCIDENCIA_FAILURE, error } }
}

function getFormAtencion() {
    return dispatch => {
        dispatch(request());

        auxiliarService.getFormAtencion()
            .then(
                form => dispatch(success(form.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: auxiliarConstants.GET_FORM_ATENCION_REQUEST } }
    function success(payload) { return { type: auxiliarConstants.GET_FORM_ATENCION_SUCCESS, payload } }
    function failure(error) { return { type: auxiliarConstants.GET_FORM_ATENCION_FAILURE, error } }
}

function getFormPavimentoProyeccion() {
    return dispatch => {
        dispatch(request());

        auxiliarService.getFormPavimentoProyeccion()
            .then(
                form => dispatch(success(form.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: auxiliarConstants.GET_FORM_PAVIMENTO_PROYECCION_REQUEST } }
    function success(payload) { return { type: auxiliarConstants.GET_FORM_PAVIMENTO_PROYECCION_SUCCESS, payload } }
    function failure(error) { return { type: auxiliarConstants.GET_FORM_PAVIMENTO_PROYECCION_FAILURE, error } }
}


function getFormPavimentoHistorico() {
    return dispatch => {
        dispatch(request());

        auxiliarService.getFormPavimentoHistorico()
            .then(
                form => dispatch(success(form.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: auxiliarConstants.GET_FORM_PAVIMENTO_HISTORICO_REQUEST } }
    function success(payload) { return { type: auxiliarConstants.GET_FORM_PAVIMENTO_HISTORICO_SUCCESS, payload } }
    function failure(error) { return { type: auxiliarConstants.GET_FORM_PAVIMENTO_HISTORICO_FAILURE, error } }
}

function getCatalogoFlujo() {
    return dispatch => {
        dispatch(request());

        auxiliarService.getCatalogoFlujo()
            .then(
                cat => dispatch(success(cat.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: auxiliarConstants.GET_CATALOGO_FLUJO_REQUEST } }
    function success(payload) { return { type: auxiliarConstants.GET_CATALOGO_FLUJO_SUCCESS, payload } }
    function failure(error) { return { type: auxiliarConstants.GET_CATALOGO_FLUJO_FAILURE, error } }
}

function getInicio() {
    return dispatch => {
        dispatch(request());

        auxiliarService.getInicio()
            .then(
                cat => dispatch(success(cat.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: auxiliarConstants.GET_INICIO_REQUEST } }
    function success(payload) { return { type: auxiliarConstants.GET_INICIO_SUCCESS, payload } }
    function failure(error) { return { type: auxiliarConstants.GET_INICIO_FAILURE, error } }
}
