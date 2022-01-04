import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const carreteraDistribuidorService = {
    getAll,
    getOne,
    create
};

function create(distribuidor) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: distribuidor
    };

    return fetch(`${config.apiUrl}/api/carreteras/distribuidores/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/distribuidores`, requestOptions).then(handleResponse);
}

function getOne(pk_distribuidor) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/distribuidores/${pk_distribuidor}`, requestOptions).then(handleResponse);
}

