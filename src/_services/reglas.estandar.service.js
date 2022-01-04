import config from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const reglasEstandarService = {
    getAll,
    getOne,
    create
};

function create(categoria) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: categoria
    };

    return fetch(`${config.apiUrl}/api/reglas/estandares/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/reglas/estandares`, requestOptions).then(handleResponse);
}

function getOne(pk_categoria) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/reglas/estandares/${pk_categoria}`, requestOptions).then(handleResponse);
}

