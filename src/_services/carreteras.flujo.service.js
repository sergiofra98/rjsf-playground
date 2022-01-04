import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const carreteraFlujoService = {
    getAll,
    getOne,
    create
};

function create(flujo) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: flujo
    };

    return fetch(`${config.apiUrl}/api/carreteras/flujos/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/flujos`, requestOptions).then(handleResponse);
}

function getOne(pk_flujo) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/flujos/${pk_flujo}`, requestOptions).then(handleResponse);
}

