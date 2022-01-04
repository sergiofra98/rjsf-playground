import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const carreteraGazaService = {
    getAll,
    getOne,
    create
};

function create(gaza) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: gaza
    };

    return fetch(`${config.apiUrl}/api/carreteras/gazas/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/gazas`, requestOptions).then(handleResponse);
}

function getOne(pk_gaza) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/gazas/${pk_gaza}`, requestOptions).then(handleResponse);
}
