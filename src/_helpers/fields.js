import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import {
    carreteraSegmentoActions,
    carreteraCarrilActions,
    carreteraCuerpoActions,
    carreteraDistribuidorActions,
    carreteraFlujoActions,
    carreteraGazaActions,
    carreteraSentidoActions,
    reglasCategoriaActions,
    reglasEstandarActions
} from '../_actions';
import selectn from "selectn";

import { Form } from 'react-bootstrap';
import obtener_catalogo from './obtener_catalogo';

const compSelect = (props, nombre = "") => {
    const [value, setValue] = useState("Escoge una opcion");
    const storeCatalogo = useSelector(state => selectn(nombre, state))
    const dispatch = useDispatch()
    useEffect(() => {
        if (!selectn('lista', storeCatalogo)) {
            switch (nombre) {
                case "carreteraCarril": dispatch(carreteraCarrilActions.getAll())
                case "carreteraCuerpo": dispatch(carreteraCuerpoActions.getAll())
                case "carreteraDistribuidor": dispatch(carreteraDistribuidorActions.getAll())
                case "carreteraFlujo": dispatch(carreteraFlujoActions.getAll())
                case "carreteraGaza": dispatch(carreteraGazaActions.getAll())
                case "carreteraSentido": dispatch(carreteraSentidoActions.getAll())
                case "reglasCategoria": dispatch(reglasCategoriaActions.getAll())
                case "reglasEstandar": dispatch(reglasEstandarActions.getAll())
                case "carreteraSegmento": dispatch(carreteraSegmentoActions.getAll())
            }
        }
        setValue(props.formData || undefined)
    }, [])

    return <Form.Group className="mb-3">
        {(props.uiSchema['ui:title'] || props.schema.title) && (
            <Form.Label id={`${props.idSchema.$id}__title`}>
                {props.schema.title}
            </Form.Label>
        )}
        <Form.Select
            onChange={(e) => {
                setValue(e.target.value)
                props.onChange(e.target.value)
            }}
            id={`${props.idSchema.$id}__root`}
            key={value}
            value={value}
        >
            <option value={undefined} hidden>Escoge una opcion</option>
            {props.schema.enum ?
                props.schema.enum.map((elem) => {
                    return (
                        <option
                            value={elem}
                            key={elem}
                        >
                            {
                                !!storeCatalogo ?
                                    obtener_catalogo(storeCatalogo.lista, elem, "nombre") :
                                    elem
                            }
                        </option >
                    )
                }) : ''}
        </Form.Select>
        {props.schema.description && (
            <Form.Text id={`${props.idSchema.$id}__description`} className="text-muted">
                {props.schema.description}
            </Form.Text>
        )}
    </Form.Group>
}


const numYear = (props) => {
    const [value, setValue] = useState(props.value || props.placeholder);
    return <Form.Group>
        <Form.Label>{this.props.schema.title}</Form.Label>
        <Form.Control
            placeholder="YYYY"
            id={props.id}
            onChange={(e) => {
                setValue(e.target.value)
                props.onChange(e.target.value)
            }}
            maxLength={4}
            value={value}
            required
        />
        <Form.Text>Escribe el año en formato YYYY</Form.Text>
    </Form.Group>
}

const numCadenamiento = (props) => {
    const [value, setValue] = useState(props.value || props.placeholder || undefined);
    const [invalid, setInvalid] = useState(false);

    const handleChange = (e) => {
        if (e.target.value > props.schema.maximum || e.target.value < props.schema.minimum)
            setInvalid(true)
        else
            setInvalid(false)
        setValue(e.target.value)
        props.onChange(e.target.value)
    }


    return <Form.Group>
        <Form.Label>{props.schema.title}</Form.Label>
        <NumberFormat
            type="text"
            id={`${props.idSchema.$id}__root`}
            placeholder="0 +000"
            onValueChange={(values) => {
                handleChange({
                    target: {
                        name: props.name,
                        value: parseInt(values.value),
                    },
                });
            }}
            customInput={Form.Control}
            format={(val) => parseInt(val / 1000) + ' +' + String(val % 1000).padStart(3, '0')}
            isNumericString
            required
            value={value}
        />
        {props.schema.description && !invalid ? (
            <Form.Text id={`${props.idSchema.$id}__description`} className="text-muted">
                {props.schema.description}
            </Form.Text>
        )
         : ""
        }
        <Form.Text>
            {invalid ? `El cadenamiento es de ${parseInt(props.schema.minimum / 1000)} + 
                ${String(props.schema.minimum % 1000).padStart(3, '0')} a ${props.schema.maximum / 1000} +
                ${String(props.schema.maximum % 1000).padStart(3, '0')}` : ''
            }
        </Form.Text>
    </Form.Group>
}


const numEntero = (props) => {
    const [value, setValue] = useState(props.value || props.placeholder || "");

    return <Form.Group>
        <Form.Label>{props.schema.title}</Form.Label>
        <Form.Control id={`${props.idSchema.$id}__root`}
            placeholder="0 m"
            onChange={(e) => {
                setValue(parseInt(e.target.value))
                props.onChange(parseInt(e.target.value))
            }}
            label={props.label}
            required
            value={value}>
        </Form.Control>
    </Form.Group>
}

const textArea = (props) => {
    const [value, setValue] = useState(props.value || props.placeholder || undefined);

    return <Form.Group>
        <Form.Label>{props.schema.title}</Form.Label>
        <Form.Control id={`${props.idSchema.$id}__root`}
            onChange={(e) => {
                setValue(e.target.value)
                props.onChange(e.target.value)
            }}
            as="textarea"
            rows={3}
            value={value}>
        </Form.Control>
    </Form.Group>
}





const fields = {
    'select': compSelect,
    'carreteraCarril': (props) => compSelect(props, 'carreteraCarril'),
    'carreteraCuerpo': (props) => compSelect(props, 'carreteraCuerpo'),
    'carreteraDistribuidor': (props) => compSelect(props, 'carreteraDistribuidor'),
    'carreteraFlujo': (props) => compSelect(props, 'carreteraFlujo'),
    'carreteraGaza': (props) => compSelect(props, 'carreteraGaza'),
    'carreteraSentido': (props) => compSelect(props, 'carreteraSentido'),
    'reglasCategoria': (props) => compSelect(props, 'reglasCategoria'),
    'reglasEstandar': (props) => compSelect(props, 'reglasEstandar'),
    'carreteraSegmento': (props) => compSelect(props, 'carreteraSegmento'),
    'numCadenamiento': numCadenamiento,
    'numEntero': (props) => numEntero(props, '0 m'),
    // fotos: fileFotos,
    'numYear': numYear,
    'textArea': textArea
}

export { fields }