import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    info,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function info(message) {
    return { type: alertConstants.INFO, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}