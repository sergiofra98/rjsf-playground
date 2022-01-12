import config from 'config';
import { authHeader, handleResponse } from '../_helpers';
import query from '../_form/query/cadenamiento.json'

export const auxiliarService = {
    getFormIncidencia,
    getFormAtencion,
    getCatalogoFlujo,
    getFormPavimentoProyeccion,
    getFormPavimentoHistorico,
    getFormQueryCadenamiento,
    getInicio
};

function getFormQueryCadenamiento(params) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    //return fetch(`${config.apiUrl}/api/auxiliar/form/incidencia/query/cadenamiento${generaParams(params)}`, requestOptions).then(handleResponse);

    return query
}

function getFormIncidencia() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/auxiliar/form/incidencia`, requestOptions).then(handleResponse);
}

function getFormPavimentoProyeccion() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/auxiliar/form/pavimento/proyeccion`, requestOptions).then(handleResponse);
}


function getFormPavimentoHistorico() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/auxiliar/form/pavimento/historico`, requestOptions).then(handleResponse);
}

function getFormAtencion() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/auxiliar/form/atencion`, requestOptions).then(handleResponse);
}

function getCatalogoFlujo() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/flujos`, requestOptions).then(handleResponse);
}

function getInicio() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/auxiliar/inicio`, requestOptions).then(handleResponse);
}

