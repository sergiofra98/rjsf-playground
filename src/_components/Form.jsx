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

function ObjectFieldTemplate(props) {
    const dispatch = useDispatch()
    const storeQuery = useSelector(state => state.auxiliar.form_incidencia.query)
    const [actualizandoForm, setActualizandoForm] = useState(false)

    const { formData, schema, uiSchema } = props;

    useEffect(() => {
        if(selectn("categoria", formData.incidencia)){
            delete formData.incidencia.categoria
        }
    }, [selectn('incidencia.estandar', formData)])

    useEffect(() => {
        // estrictamente para el objeto flujo
        if (props.idSchema.$id == "root_flujo") {
            if (!actualizandoForm) {
                let max = props.schema.properties.cadenamiento.maximum
                let min = props.schema.properties.cadenamiento.minimum
                // si existen los campos
                if (('segmento' in props.formData &&
                    'cadenamiento' in props.formData) &&
                    // si son validos
                    (props.formData.cadenamiento <= max &&
                        props.formData.cadenamiento >= min)
                ) {
                    // si no existe eel query n el store se consigue
                    if (!storeQuery.map[props.formData['segmento']] && !storeQuery.loading) {
                        dispatch(auxiliarActions.getFormQueryCadenamiento({
                            segmento: [props.formData['segmento']]
                        }))
                    }
                    else {
                        // agrega los campos consiguientes al formulario
                        let segmentos = selectn('map.' + props.formData['segmento'], storeQuery)
                        let retorno = {
                            properties: {
                                flujo: {
                                    properties: {},
                                    required: []
                                }
                            }
                        }

                        if (!!segmentos) {
                            // si el catalogo está listo filtramos para ver el segmento apropiado
                            segmentos = segmentos.find(element => props.formData.cadenamiento >= element.inicio &&
                                props.formData.cadenamiento <= element.fin)

                            // iteramos cada cmpo que retornó el query
                            for (const [key, value] of Object.entries(segmentos)) {
                                // omitimos las llaves de inicio y fin
                                if (key != 'inicio' && key != 'fin') {
                                    let schema = selectn('registry.rootSchema.$defs.selects.' + key, props)
                                    // creamos el objeto en las propiedades de flujo
                                    retorno.properties.flujo.properties[key] = { ...schema, enum: value }
                                    retorno.properties.flujo.required.push(key)
                                }
                            }
                            // avisamos que se está actualizando el form
                            setActualizandoForm(true)
                            // se actualiza el store
                            dispatch(auxiliarActions.updateFormIncidencia(retorno, props.registry.rootSchema))
                        }

                    }
                }
            }

        }
        else if (props.registry.rootSchema.properties.flujo.required.length > 2) {
            setActualizandoForm(false)
        }
    }, [props.formData, storeQuery])



    return (
        <Fragment key={props.idSchema.$id}>
            {(props.uiSchema['ui:title'] || props.title) && (
                <Form.Label id={`${props.idSchema.$id}__title`}>
                    {props.title}
                </Form.Label>
            )}
            {props.description && (
                <Form.Text id={`${props.idSchema.$id}__description`} className="text-muted">
                    {props.description}
                </Form.Text>
            )}

            {storeQuery.loading ?
                <div className="row">
                    <LoadingHelper />
                </div>
                : ''
            }
            {props.properties.map(prop => prop.content)}
        </Fragment>
    );
}

function transformErrors(errors) {
    return errors.map(error => {
        // console.log(error)
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

    const handleChange = (e) => {
        if (!props.onChange) {
            props.setData(e.formData)
        } else props.onChange(e)
    }

    // useEffect(() => {
    //     if(selectn("categoria", props.data.incidencia)){
    //         delete props.data.incidencia.categoria
    //     }
    // }, [selectn("estandar", props.data.incidencia)])
    return (
        <Row>
            {!!selectn('form_schema.json_schema', props) &&
                !!selectn('form_schema.ui_schema', props) &&
                !selectn('form_schema.cargando', props) ?
                <FormObject
                    // control
                    disabled={props.disabled}
                    formData={props.data}
                    onChange={handleChange}
                    // componentes internos
                    fields={fields}
                    widgets={widgets}
                    onSubmit={(form) => console.log(form)}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    // schema
                    schema={props.form_schema.json_schema}
                    uiSchema={props.form_schema.ui_schema}
                    // validación
                    liveValidate
                    showErrorList={false}
                    transformErrors={transformErrors}
                /> :
                <LoadingHelper />}
        </Row>
    )
}


export { FormComp }