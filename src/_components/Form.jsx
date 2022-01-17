import React, { Fragment, useState, useEffect } from 'react'
import FormObject from "@rjsf/core";
import { LoadingHelper } from "../_components";
import { fields, widgets } from "../_helpers";
import selectn from "selectn";
import { Row } from 'react-bootstrap';
import { Form, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { auxiliarActions } from '../_actions';
import { deepmerge } from 'deepmerge-ts';

const ObjectFieldTemplate = (props) => {
    const dispatch = useDispatch()
    const storeQuery = useSelector(state => state.auxiliar.form_incidencia.query)
    let formExtendido = {
        properties: {
            flujo: {
                properties: {},
                required: []
            }
        }
    }
    const validaGetQuery = () => {
        let max = props.schema.properties.cadenamiento.maximum
        let min = props.schema.properties.cadenamiento.minimum
        // si existen los campos
        if (('segmento' in props.formData &&
            'cadenamiento' in props.formData) &&
            // si son validos, dentro del rango
            (props.formData.cadenamiento <= max &&
                props.formData.cadenamiento >= min)
        ) {
            return true
        }

        return false
    }

    const consigueQuery = () => {
        // si no existe eel query n el store se consigue
        dispatch(auxiliarActions.getFormQueryCadenamiento({
            segmento: [props.formData['segmento']]
        }))
    }

    const augmentaQuery = () => {
        // agrega los campos consiguientes al formulario
        let segmentos = selectn('map.' + props.formData['segmento'], storeQuery)
        let retorno = {
                flujo: {
                    properties: {},
                    required: []
                }
            
        }

        // si el catalogo está listo filtramos para ver el segmento apropiado
        // y si los campos registrados en el schema son diferentes a los que se deben agregar
        segmentos = segmentos.find(element => props.formData.cadenamiento >= element.inicio &&
            props.formData.cadenamiento <= element.fin)

        // iteramos cada cmpo que retornó el query
        for (const [key, value] of Object.entries(segmentos)) {
            // omitimos las llaves de inicio y fin
            if (key != 'inicio' && key != 'fin') {
                let schema = selectn('registry.rootSchema.$defs.selects.' + key, props)
                // creamos el objeto en las propiedades de flujo
                retorno.flujo.properties[key] = { ...schema, enum: value }
                retorno.flujo.required.push(key)
            }
        }
        // se actualiza el store
        dispatch(auxiliarActions.setFormIncidenciaExt(retorno))
    }


    useEffect(() => {
        // estrictamente para el objeto flujo
        if (props.idSchema.$id == "root_flujo") {
            // si existen los campos
            if (validaGetQuery()) {
                if (!storeQuery.map[props.formData['segmento']] && !storeQuery.loading) {
                    consigueQuery()
                }
            }
        }
    }, [props.formData])

    useEffect(() => {
        if (props.idSchema.$id == "root_flujo") {
            // si existen los campos
            if (validaGetQuery()) {
                if (!!storeQuery.map[props.formData['segmento']]) {
                    if (JSON.stringify(formExtendido.properties.flujo.required) != JSON.stringify(
                        Object.keys(storeQuery.map[props.formData['segmento']][0]).filter((key, val) => {
                            if (key != 'inicio' && key != 'fin')
                                return key
                        })
                    ))
                        augmentaQuery()
                }
            }
        }
        
      
    }, [storeQuery])

    useEffect(() => {
        if (props.idSchema.$id == "root_incidencia") {
            
            if('estandar' in props.formData){
                let categoria = {
                    "categoria": {
                        "$ref": "#/$defs/selects/categoria"
                    }
                }
                
                // se actualiza el store
                dispatch(auxiliarActions.setFormIncidenciaExtI(categoria))
                
            }
        }
    }, [props.formData])


    return (
        <Fragment key={props.idSchema.$id}>
            {(props.uiSchema['ui:title'] || props.title) && (
                <Form.Label className="d-flex fs-4 mb-0 mt-3" id={`${props.idSchema.$id}__title`}>
                    {props.title}
                </Form.Label>
            )}
            {props.description && (
                <Form.Text className="d-flex text-muted mb-3" id={`${props.idSchema.$id}__description`}>
                    {props.description}
                </Form.Text>
            )}
            <div className="row">
                {props.properties.map(prop => prop.content)}
            </div>
        </Fragment>
    );
}

function transformErrors(errors) {
    return errors.map(error => {
      if (error.name === "required") {
        error.message = "Obligatorio"
      }
      if (error.name === "type") {
        if(error.params) 
            if(error.params.type === "number")
                error.message = "Debe ser un número"
      }
      if (error.name === "minimum" || error.name === "maximum")
        error.message = ""
      return error;
    });
}



const FormComp = (props) => {
    return (
        <Row>
            {!!selectn('form_schema.json_schema', props) &&
                !!selectn('form_schema.ui_schema', props) &&
                !selectn('form_schema.cargando', props) ?
                <FormObject
                    // control
                    disabled={props.disabled}
                    formData={props.data}
                    onChange={(e) => props.setData(e.formData)}
                    // componentes internos
                    fields={fields}
                    widgets={widgets}
                    onSubmit={(form) => console.log(form)}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    // schema
                    schema={deepmerge(props.form_schema.json_schema, props.aug_schema)}
                    uiSchema={props.form_schema.ui_schema}
                    // validación
                    transformErrors={transformErrors}
                /> :
                <LoadingHelper />}
        </Row>
    )
}


export { FormComp }