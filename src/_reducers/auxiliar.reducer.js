import { auxiliarConstants } from '../_constants';

export function auxiliar(state = {
    form_incidencia: {
        query: {
            map: {}
        }
    },
    form_atencion: {},
    form_pavimento_proyeccion: {},
    form_pavimento_historico: {},
    catalogos: {},
    inicio: { loading: true }
}, action) {
    let temp;
    switch (action.type) {
        case auxiliarConstants.GET_FORM_INCIDENCIA_REQUEST:
            return {
                ...state,
                form_incidencia: {
                    loading: true
                }
            };
        case auxiliarConstants.UPDATE_FORM_INCIDENCIA:
        case auxiliarConstants.GET_FORM_INCIDENCIA_SUCCESS:
            return {
                ...state,
                form_incidencia: {
                    ...action.payload,
                    query: {
                        map: {}
                    }
                }
            };
        case auxiliarConstants.GET_FORM_INCIDENCIA_FAILURE:
            return {
                ...state,
                form_incidencia: {
                    error: action.error
                }

            };
        case auxiliarConstants.GET_FORM_QUERY_CADENAMIENTO_REQUEST:
            return {
                ...state,
                form_incidencia: {
                    ...state.form_incidencia,
                    query: {
                        map: state.form_incidencia.query.map,
                        loading: true
                    }
                }
            };
        case auxiliarConstants.GET_FORM_QUERY_CADENAMIENTO_SUCCESS:
            // copiamos el mapa existente
            temp = { ...state.form_incidencia.query.map }
            // agregamos la lista
            temp[action.payload.segmento] = action.payload.lista

            return {
                ...state,
                form_incidencia: {
                    ...state.form_incidencia,
                    query: {
                        map: temp
                    }
                }
            };
        case auxiliarConstants.GET_FORM_QUERY_CADENAMIENTO_FAILURE:
            return {
                ...state,
                form_incidencia: {
                    ...state.form_incidencia,
                    query: {
                        map: state.form_incidencia.query.map,
                        error: action.error
                    }
                }

            };
        case auxiliarConstants.GET_FORM_ATENCION_REQUEST:
            return {
                ...state,
                form_atencion: {
                    loading: true
                }
            };
        case auxiliarConstants.GET_FORM_ATENCION_SUCCESS:
            return {
                ...state,
                form_atencion: {
                    ...action.payload
                }
            };
        case auxiliarConstants.GET_FORM_ATENCION_FAILURE:
            return {
                ...state,
                form_atencion: {
                    error: action.error
                }

            };
        case auxiliarConstants.GET_FORM_PAVIMENTO_PROYECCION_REQUEST:
            return {
                ...state,
                form_pavimento_proyeccion: {
                    loading: true
                }
            };
        case auxiliarConstants.GET_FORM_PAVIMENTO_PROYECCION_SUCCESS:
            return {
                ...state,
                form_pavimento_proyeccion: {
                    ...action.payload
                }
            };
        case auxiliarConstants.GET_FORM_PAVIMENTO_PROYECCION_FAILURE:
            return {
                ...state,
                form_pavimento_proyeccion: {
                    error: action.error
                }

            };
        case auxiliarConstants.GET_FORM_PAVIMENTO_HISTORICO_REQUEST:
            return {
                ...state,
                form_pavimento_historico: {
                    loading: true
                }
            };
        case auxiliarConstants.GET_FORM_PAVIMENTO_HISTORICO_SUCCESS:
            return {
                ...state,
                form_pavimento_historico: {
                    ...action.payload
                }
            };
        case auxiliarConstants.GET_FORM_PAVIMENTO_HISTORICO_FAILURE:
            return {
                ...state,
                form_pavimento_historico: {
                    error: action.error
                }

            };
        case auxiliarConstants.GET_CATALOGO_FLUJO_REQUEST:
            return {
                ...state,
                catalogos: {
                    flujos: {
                        loading: true
                    }
                }
            };
        case auxiliarConstants.GET_CATALOGO_FLUJO_SUCCESS:
            return {
                ...state,
                catalogos: {
                    flujos: action.payload
                }
            };
        case auxiliarConstants.GET_CATALOGO_FLUJO_FAILURE:
            return {
                ...state,
                catalogos: {
                    flujos: {
                        error: action.error
                    }
                }

            };
        case auxiliarConstants.GET_INICIO_REQUEST:
            return {
                ...state,
                inicio: {
                    loading: true
                }
            };
        case auxiliarConstants.GET_INICIO_SUCCESS:
            return {
                ...state,
                inicio: {
                    loading: false,
                    info: action.payload,
                    error: undefined,
                }
            };
        case auxiliarConstants.GET_INICIO_FAILURE:
            return {
                ...state,
                inicio: {
                    loading: false,
                    error: action.error
                }

            };
        default:
            return state
    }
}