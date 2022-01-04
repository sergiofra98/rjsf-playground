import { carreteraSentidoConstants } from '../_constants';

export function carreteraSentido(state = {loading:true}, action) {
    let lista = {}
    switch (action.type) {
        // consigue una imagen
        case carreteraSentidoConstants.GET_ONE_REQUEST:
        case carreteraSentidoConstants.GET_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case carreteraSentidoConstants.GET_ONE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                loading: false,
                error: undefined
            };
        case carreteraSentidoConstants.GET_ALL_SUCCESS:
            action.payload.forEach((item) => lista[item.id] = item)
            return {
                lista: {
                    ...state.lista,
                    ...lista
                },
                loading: false,
                error: undefined
            };
        case carreteraSentidoConstants.GET_ONE_FAILURE:
        case carreteraSentidoConstants.GET_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case carreteraSentidoConstants.CREATE_REQUEST:
            return {
                ...state,
                uploading: true,
                error: undefined
            };
        case carreteraSentidoConstants.CREATE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                uploading: false,
                created:true,
                error: undefined
            };
        case carreteraSentidoConstants.CREATE_FAILURE:
            return {
                ...state,
                uploading: false,
                error: action.error
            };
            
        default:
            return state
    }
}