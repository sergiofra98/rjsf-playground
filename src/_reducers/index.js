import { combineReducers } from 'redux';
import { carreteraSegmento } from './carreteras.segmento.reducer';
import { carreteraCarril } from './carreteras.carril.reducer';
import { carreteraCuerpo } from './carreteras.cuerpo.reducer';
import { carreteraDistribuidor } from './carreteras.distribuidor.reducer';
import { carreteraFlujo } from './carreteras.flujo.reducer';
import { carreteraGaza } from './carreteras.gaza.reducer';
import { carreteraSentido } from './carreteras.sentido.reducer';
import { reglasCategoria } from './reglas.categoria.reducer';
import { reglasEstandar } from './reglas.estandar.reducer';
import { auxiliar } from './auxiliar.reducer';

const appReducer = combineReducers({
    segmentos: carreteraSegmento,
    carreteraCarril,
    carreteraCuerpo,
    carreteraDistribuidor,
    carreteraFlujo,
    carreteraGaza,
    carreteraSentido,
    reglasCategoria,
    reglasEstandar,
    auxiliar
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer;