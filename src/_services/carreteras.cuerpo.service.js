import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const carreteraCuerpoService = {
    getAll,
    getOne,
    create
};

function create(cuerpo) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: cuerpo
    };

    return fetch(`${config.apiUrl}/api/carreteras/cuerpos/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/cuerpos`, requestOptions).then(handleResponse);
}

function getOne(pk_cuerpo) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/cuerpos/${pk_cuerpo}`, requestOptions).then(handleResponse);
}

