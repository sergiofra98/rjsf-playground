import { carreteraSegmentoConstants } from '../_constants';

export function carreteraSegmento(state = {loading:true}, action) {
    let lista = {}
    switch (action.type) {
        // consigue una imagen
        case carreteraSegmentoConstants.GET_ONE_REQUEST:
        case carreteraSegmentoConstants.GET_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case carreteraSegmentoConstants.GET_ONE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                loading: false,
                error: undefined
            };
        case carreteraSegmentoConstants.GET_ALL_SUCCESS:
            action.payload.forEach((item) => lista[item.id] = item)
            return {
                lista: {
                    ...state.lista,
                    ...lista
                },
                loading: false,
                error: undefined
            };
        case carreteraSegmentoConstants.GET_ONE_FAILURE:
        case carreteraSegmentoConstants.GET_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case carreteraSegmentoConstants.CREATE_REQUEST:
            return {
                ...state,
                uploading: true,
                error: undefined
            };
        case carreteraSegmentoConstants.CREATE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                uploading: false,
                created:true,
                error: undefined
            };
        case carreteraSegmentoConstants.CREATE_FAILURE:
            return {
                ...state,
                uploading: false,
                error: action.error
            };
        default:
            return state
    }
}