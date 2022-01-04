import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const carreteraSentidoService = {
    getAll,
    getOne,
    create
};

function create(sentido) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: sentido
    };

    return fetch(`${config.apiUrl}/api/carreteras/sentidos/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/sentidos`, requestOptions).then(handleResponse);
}

function getOne(pk_sentido) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/sentidos/${pk_sentido}`, requestOptions).then(handleResponse);
}

