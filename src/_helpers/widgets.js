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

import { Form, Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'
import { ImageAlt, Plus, X, XCircleFill } from 'react-bootstrap-icons'

import obtener_catalogo from './obtener_catalogo'


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
        setValue(props.value || null)
    }, [])

    return <Form.Select
        onChange={(e) => {
            setValue(e.target.value)
            props.onChange(e.target.value)
        }}
        key={value}
        value={value}
    >
        <option value={undefined} hidden>Escoge una opcion</option>
        {props.options.enumOptions ?
            props.options.enumOptions.map((elem) => {
                return (
                    <option
                        value={elem.value}
                        key={elem.value}
                    >
                        {
                            obtener_catalogo(storeCatalogo.lista,elem.label,"nombre")
                        }
                    </option >
                )
            }) : ''}
    </Form.Select>
}

const numYear = (props) => {
    const [value, setValue] = useState(props.value || props.placeholder);
    return <Form.Group>
        <Form.Control
            placeholder="YYYY"
            id={props.id}
            onChange={(e) => {
                setValue(e.target.value)
                props.onChange(e.target.value)
            }}
            maxLength={4}
            label={props.label}
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
        <NumberFormat
            type="text"
            id={props.id}
            placeholder="0 +000"
            onValueChange={(values) => {
                handleChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            customInput={Form.Control}
            format={(val) => parseInt(val / 1000) + ' +' + String(val % 1000).padStart(3, '0')}
            isNumericString
            required
            value={value}
        />
        <Form.Text>
            {invalid ? `El cadenamiento es de ${parseInt(props.schema.minimum / 1000)} + 
                ${String(props.schema.minimum % 1000).padStart(3, '0')} a ${props.schema.maximum / 1000} +
                ${String(props.schema.maximum % 1000).padStart(3, '0')}` : ''
            }
        </Form.Text>
    </Form.Group>
}

const numEntero = (props) => {
    const [value, setValue] = useState(props.value || props.placeholder || undefined);

    return <Form.Control id={props.id}
        placeholder="0 m"
        onChange={(e) => {
            setValue(e.target.value)
            props.onChange(e.target.value)
        }}
        label={props.label}
        required
        value={value}>


    </Form.Control>
}

const textArea = (props) => {
    const [value, setValue] = useState(props.value || props.placeholder || undefined);

    return <Form.Control id={props.id}
        onChange={(e) => {
            setValue(e.target.value)
            props.onChange(e.target.value)
        }}
        as="textarea"
        rows={3}
        value={value}>
    </Form.Control>
}


const fileFotos = (props) => {
    const [preview, setPreview] = useState([]);
    const [fotoIndex, setFotoIndex] = useState(0);
    useEffect(() => {
        if (!!props.value) {
            let temp_data = []
            for (let i in props.value) {
                temp_data.push(props.value[i][0].url)
            }
            setPreview(temp_data)
        }
    }, [])

    useEffect(() => {
        setFotoIndex(length_fotos(props.value) - 1)
    }, [props.value])

    const handleSelect = (selectedIndex, e) => {
        setFotoIndex(selectedIndex);
    };

    const length_fotos = (fotos) => {
        let contador = 0
        for (let i in fotos) {
            const data = fotos[i]
            if (!data[0].delete) {
                contador += 1
            }
        }
        return contador

    }

    const handleChange = event => {


        let files = event.target.files;

        let tempFiles = []
        let filesToAdd = props.value

        for (var i = 0; i < files.length; i++) {

            tempFiles.push(files[i])
            filesToAdd.push([{
                "file": files[i],
                "delete": false,
                "url": window.URL.createObjectURL(files[i])
            }])
        }
        setFotoIndex(0)
        props.onChange(filesToAdd)
        setPreview(filesToAdd)

    }
    const handlePreview = (index) => {
        setFotoIndex(index)
    }


    const handleDelete = (index) => {

        let data = props.value
        data[index][0].delete = true
        data[index][0].url = URL.revokeObjectURL(data[index][0].file)
        props.onChange(data)
        handlePreview(0)
        let temp = preview
        temp.slice(index, 1)
        setPreview([...preview, temp])
    }

    return length_fotos(props.value) == 0 ?
        <div className="row">
            <div className='text-center my-2 h-100 bg-secondary mx-2' style={{ width: "95%" }}>
                <ImageAlt className='w-50 h-50 text-white my-5' />
            </div>


            <label className="custom-file-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    accept=".png, .jpg, .jpeg"
                    type="file"
                    multiple
                    onChange={handleChange}
                    required
                    className="d-none w-50"
                    type="file"
                    onClick={(e) => { e.target.value = null }}
                />
                <div className="btn btn-outline-secondary">
                    Escoger Imagenes
                </div>
            </label>
        </div>
        :
        // para cuando sí hay
        <Fragment>

            <div className="row">
                <Carousel activeIndex={fotoIndex} onSelect={handleSelect} className="h-100">
                    {props.value.map((data, index) => {
                        if (data[0].delete) {
                            return ""
                        }
                        return <Carousel.Item key={index}>
                            <img className="d-block w-100"
                                src={data[0].url}
                                key={'imagecarrusel-' + index}
                                onClick={() => handlePreview(index)}
                            />
                        </Carousel.Item>
                    })}
                </Carousel>

            </div>
            <div className="row">
                {(props.value || []).map((data, index) => {
                    if (data[0].delete) {
                        return ""
                    }
                    return <div className="col-xs-4 col-sm-6 col-md-4 col-xl-3 position-relative my-2" key={index}>
                        <button
                            style={{ position: 'absolute', right: 16, marginTop: 8 }}
                            className="btn btn-outline-danger btn-sm"
                            onClick={e => { handleDelete(index) }}
                            value={index}
                            key={'imagepreviewww-' + index}>
                            <X />
                        </button>
                        <img className="img-thumbnail w-100 h-100"
                            src={data[0].url}
                            key={'imagepreviebutton-' + index}
                            onClick={() => handlePreview(index)}
                        />

                    </div>
                })}
                <div className="mt-3 col-xs-4 col-sm-6 col-md-4 col-xl-3">
                    <label>
                        <input
                            id="btn-append"
                            name="btn-append"
                            accept=".png, .jpg, .jpeg"
                            type="file"
                            multiple
                            onChange={handleChange}
                            className="d-none"
                            type="file"
                            onClick={(e) => { e.target.value = null }}
                        />
                        <div className="btn btn-outline-secondary">
                            <Plus size={35} />
                        </div>
                    </label>
                </div>
            </div>
        </Fragment>
}


const widgets = {
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
    'numEntero': numEntero,
    'fotos': fileFotos,
    'numYear': numYear,
    'textArea': textArea
}

export { widgets }
