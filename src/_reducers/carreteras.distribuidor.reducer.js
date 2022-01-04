import { carreteraDistribuidorConstants } from '../_constants';

export function carreteraDistribuidor(state = {loading:true}, action) {
    let lista = {}
    switch (action.type) {
        // consigue una imagen
        case carreteraDistribuidorConstants.GET_ONE_REQUEST:
        case carreteraDistribuidorConstants.GET_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case carreteraDistribuidorConstants.GET_ONE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                loading: false,
                error: undefined
            };
        case carreteraDistribuidorConstants.GET_ALL_SUCCESS:
            action.payload.forEach((item) => lista[item.id] = item)
            return {
                lista: {
                    ...state.lista,
                    ...lista
                },
                loading: false,
                error: undefined
            };
        case carreteraDistribuidorConstants.GET_ONE_FAILURE:
        case carreteraDistribuidorConstants.GET_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case carreteraDistribuidorConstants.CREATE_REQUEST:
            return {
                ...state,
                uploading: true,
                error: undefined
            };
        case carreteraDistribuidorConstants.CREATE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                uploading: false,
                created:true,
                error: undefined
            };
        case carreteraDistribuidorConstants.CREATE_FAILURE:
            return {
                ...state,
                uploading: false,
                error: action.error
            };
        default:
            return state
    }
}