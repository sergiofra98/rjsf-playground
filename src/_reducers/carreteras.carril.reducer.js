import { carreteraCarrilConstants } from '../_constants';

export function carreteraCarril(state = {loading:true}, action) {
    let lista = {}
    switch (action.type) {
        // consigue una imagen
        case carreteraCarrilConstants.CLEARALL_REQUEST:
            return {}
        case carreteraCarrilConstants.GET_ONE_REQUEST:
        case carreteraCarrilConstants.GET_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case carreteraCarrilConstants.GET_ONE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                loading: false,
                error: undefined
            };
        case carreteraCarrilConstants.GET_ALL_SUCCESS:
            action.payload.forEach((item) => lista[item.id] = item)
            return {
                lista: {
                    ...state.lista,
                    ...lista
                },
                loading: false,
                error: undefined
            };
        case carreteraCarrilConstants.GET_ONE_FAILURE:
        case carreteraCarrilConstants.GET_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case carreteraCarrilConstants.CREATE_REQUEST:
            return {
                ...state,
                uploading: true,
                error: undefined
            };
        case carreteraCarrilConstants.CREATE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                uploading: false,
                created:true,
                error: undefined
            };
        case carreteraCarrilConstants.CREATE_FAILURE:
            return {
                ...state,
                uploading: false,
                error: action.error
            };
        case carreteraCarrilConstants.DELETE_REQUEST:
            return {
                ...state,
                deleting: true,
                error: undefined
            };
        case carreteraCarrilConstants.DELETE_SUCCESS:
            lista = state.lista
            delete lista[action.id]
            return {
                lista: state.lista,
                deleting: false,
                error: undefined
            };
        case carreteraCarrilConstants.DELETE_FAILURE:
            return {
                ...state,
                deleting: false,
                error: action.error
            };
        default:
            return state
    }
}