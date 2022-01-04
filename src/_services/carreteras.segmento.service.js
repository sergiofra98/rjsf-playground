import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const carreteraSegmentoService = {
    getAll,
    getOne,
    create
};

function create(segmento) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: segmento
    };

    return fetch(`${config.apiUrl}/api/carreteras/segmentos/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/segmentos`, requestOptions).then(handleResponse);
}

function getOne(pk_segmento) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/segmentos/${pk_segmento}`, requestOptions).then(handleResponse);
}
