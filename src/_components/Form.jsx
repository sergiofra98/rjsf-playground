import React, { Fragment, useState, useEffect } from 'react'
import FormObject from "@rjsf/core";
import { LoadingHelper } from "../_components";
import { fields, widgets } from "../_helpers";
import selectn from "selectn";
import { Row } from 'react-bootstrap';

function ObjectFieldTemplate(props) {
    // console.log('props on obkectfield', props)
    const canExpand = function canExpand() {
        const { formData, schema, uiSchema } = props;

        useEffect(() => {
            if(selectn("categoria", formData.incidencia)){
                delete formData.incidencia.categoria
            }
        }, [selectn('incidencia.estandar', formData)])

        if (!schema.additionalProperties) {
            return false;
        }
        const { expandable } = getUiOptions(uiSchema);
        if (expandable === false) {
            return expandable;
        }
        // if ui:options.expandable was not explicitly set to false, we can add
        // another property if we have not exceeded maxProperties yet
        if (schema.maxProperties !== undefined) {
            return Object.keys(formData).length < schema.maxProperties;
        }
        return true;
    };

    const { TitleField, DescriptionField } = props;


    return (
        <Fragment key={props.idSchema.$id}>
            {(props.uiSchema['ui:title'] || props.title) && (
                <TitleField
                    id={`${props.idSchema.$id}__title`}
                    title={props.title || props.uiSchema['ui:title']}
                    required={props.required}
                    formContext={props.formContext}
                />
            )}
            {props.description && (
                <DescriptionField
                    id={`${props.idSchema.$id}__description`}
                    description={props.description}
                    formContext={props.formContext}
                />
            )}
            {props.properties.map(prop => prop.content)}
            {canExpand() && (
                <AddButton
                    className="object-property-expand"
                    onClick={props.onAddClick(props.schema)}
                    disabled={props.disabled || props.readonly}
                />
            )}
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



const Form = (props) => {

    const handleChange = (e) => {
        if(!props.onChange ) { 
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
                    widgets={widgets}
                    fields={fields}
                    widgets={widgets}
                    onSubmit={(form)=>console.log(form)}
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


export { Form }