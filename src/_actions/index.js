export * from './alert.actions';
export * from './carreteras.segmento.actions';
export * from './carreteras.carril.actions';
export * from './carreteras.cuerpo.actions';
export * from './carreteras.distribuidor.actions';
export * from './carreteras.flujo.actions';
export * from './carreteras.gaza.actions';
export * from './carreteras.sentido.actions';
export * from './reglas.categoria.actions';
export * from './reglas.estandar.actions';

export const  getAllSegmentosForClass = () => {
    console.log('aqui ando')
    return dispatch => {
        console.log("THIS IDK")
        dispatch(request());

        carreteraSegmentoService.getAll()
            .then(
                resp => dispatch(success(resp.payload)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: carreteraSegmentoConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: carreteraSegmentoConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: carreteraSegmentoConstants.GET_ALL_FAILURE, error } }
}