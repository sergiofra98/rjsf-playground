import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const carreteraCarrilService = {
    getAll,
    getOne,
    create,
    delete: _delete
};

function create(carril) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(carril)
    };

    return fetch(`${config.apiUrl}/api/carreteras/carriles`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/carriles`, requestOptions).then(handleResponse);
}

function getOne(pk_carril) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/carriles/${pk_carril}`, requestOptions).then(handleResponse);
}

function _delete(pk_carril) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/carreteras/carriles/${pk_carril}`, requestOptions).then(handleResponse);
}
