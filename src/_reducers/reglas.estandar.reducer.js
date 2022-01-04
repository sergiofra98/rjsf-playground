import { reglasEstandarConstants } from '../_constants';

export function reglasEstandar(state = {}, action) {
    switch (action.type) {
        // consigue una imagen
        case reglasEstandarConstants.GET_ONE_REQUEST:
        case reglasEstandarConstants.GET_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case reglasEstandarConstants.GET_ONE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                loading: false,
                error: undefined
            };
        case reglasEstandarConstants.GET_ALL_SUCCESS:
            let lista = {}
            action.payload.forEach((item) => lista[item.id] = item)
            return {
                lista: {
                    ...state.lista,
                    ...lista
                },
                loading: false,
                error: undefined
            };
        case reglasEstandarConstants.GET_ONE_FAILURE:
        case reglasEstandarConstants.GET_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case reglasEstandarConstants.CREATE_REQUEST:
            return {
                ...state,
                uploading: true,
                error: undefined
            };
        case reglasEstandarConstants.CREATE_SUCCESS:
            return {
                ...state,
                uploading: false,
                error: undefined
            };
        case reglasEstandarConstants.CREATE_FAILURE:
            return {
                ...state,
                uploading: false,
                error: action.error
            };
        default:
            return state
    }
}