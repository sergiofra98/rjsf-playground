import { reglasCategoriaConstants } from '../_constants';

export function reglasCategoria(state = {}, action) {
    switch (action.type) {
        // consigue una imagen
        case reglasCategoriaConstants.GET_ONE_REQUEST:
        case reglasCategoriaConstants.GET_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case reglasCategoriaConstants.GET_ONE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                loading: false,
                error: undefined
            };
        case reglasCategoriaConstants.GET_ALL_SUCCESS:
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
        case reglasCategoriaConstants.GET_ONE_FAILURE:
        case reglasCategoriaConstants.GET_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case reglasCategoriaConstants.CREATE_REQUEST:
            return {
                ...state,
                uploading: true,
                error: undefined
            };
        case reglasCategoriaConstants.CREATE_SUCCESS:
            return {
                ...state,
                uploading: false,
                error: undefined
            };
        case reglasCategoriaConstants.CREATE_FAILURE:
            return {
                ...state,
                uploading: false,
                error: action.error
            };
        default:
            return state
    }
}