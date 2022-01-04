import { carreteraGazaConstants } from '../_constants';

export function carreteraGaza(state = {loading:true}, action) {
    let lista = {}
    switch (action.type) {
        // consigue una imagen
        case carreteraGazaConstants.GET_ONE_REQUEST:
        case carreteraGazaConstants.GET_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
        case carreteraGazaConstants.GET_ONE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                loading: false,
                error: undefined
            };
        case carreteraGazaConstants.GET_ALL_SUCCESS:
            action.payload.forEach((item) => lista[item.id] = item)
            return {
                lista: {
                    ...state.lista,
                    ...lista
                },
                loading: false,
                error: undefined
            };
        case carreteraGazaConstants.GET_ONE_FAILURE:
        case carreteraGazaConstants.GET_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case carreteraGazaConstants.CREATE_REQUEST:
            return {
                ...state,
                uploading: true,
                error: undefined
            };
        case carreteraGazaConstants.CREATE_SUCCESS:
            return {
                lista: {
                    ...state.lista,
                    [action.payload.id]: action.payload
                },
                uploading: false,
                created:true,
                error: undefined
            };
        case carreteraGazaConstants.CREATE_FAILURE:
            return {
                ...state,
                uploading: false,
                error: action.error
            };
        default:
            return state
    }
}