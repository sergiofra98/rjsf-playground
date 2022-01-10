import React, { useState, useEffect, Fragment } from 'react'
import { store } from '../_helpers'
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { getAllSegmentosForClass } from '../_actions'
import {
    // carreteraSegmentoActions,
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



class numYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props.formData, value: props.value || props.placeholder };
    }

    onChange() {
        return (event) => {
            this.setState({
                data: event.target.value,
                value: event.target.value
            }, () => this.props.onChange(this.state.data));
        }
    };

    render() {
        return <Form.Group>
            <Form.Label>{this.props.schema.title}</Form.Label>
            <Form.Control
                placeholder="YYYY"
                id={this.props.id}
                onChange={this.onChange()}
                maxLength={4}
                required
            />
            <Form.Text>Escribe el año en formato YYYY</Form.Text>
        </Form.Group>
    }
}

class numCadenamiento extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props.formData, invalid: false, value: '' };
    }

    onChange() {
        return (e) => {
            if (e.value > this.props.schema.maximum || e.value < this.props.schema.minimum)
                this.setState({ ...this.state, invalid: true })
            else
                this.setState({ ...this.state, invalid: false })
            this.setState({
                data: parseInt(e.value),
                value: e.value
            }, () => this.props.onChange(this.state.data));
        }
    };


    render() {
        return <Form.Group>
            <Form.Label>{this.props.schema.title}</Form.Label>
            <NumberFormat
                type="text"
                id={this.props.id}
                placeholder="0 +000"
                onValueChange={this.onChange()}
                customInput={Form.Control}
                format={(val) => parseInt(val / 1000) + ' +' + String(val % 1000).padStart(3, '0')}
                isNumericString
                required
                value={this.state.value}
            />
            <Form.Text>
                {this.state.invalid ? `El cadenamiento es de ${parseInt(this.props.schema.minimum / 1000)} + 
                    ${String(this.props.schema.minimum % 1000).padStart(3, '0')} a ${this.props.schema.maximum / 1000} +
                    ${String(this.props.schema.maximum % 1000).padStart(3, '0')}` : ''
                }
            </Form.Text>
        </Form.Group>
    }
}

class numEntero extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.formData,

        };
    }

    onChange() {
        return (event) => {
            this.setState({
                data: parseInt(event.target.value)
            }, () => this.props.onChange(this.state.data));
        };
    }

    render() {
        // const [value, setValue] = useState(this.props.value || this.props.placeholder || undefined);

        return <Form.Group>
            <Form.Label>{this.props.schema.title}</Form.Label>
            <Form.Control id={this.props.id}
                placeholder='0 m'
                onChange={this.onChange()}
                required
                value={this.state.value}>
            </Form.Control>
        </Form.Group>
    }
}


class textArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.formData,
        };
    }

    onChange() {
        return (event) => {
            this.setState({
                data: event.target.value
            }, () => this.props.onChange(this.state.data));
        };
    }

    render() {
        // const [value, setValue] = useState(props.value || props.placeholder || undefined);
        return <Form.Group>
            <Form.Label>{this.props.schema.title.toString()}</Form.Label>
            <Form.Control id={this.props.id}
                onChange={this.onChange()}
                as="textarea"
                rows={3}
                value={this.state.value}>
            </Form.Control>
        </Form.Group>
    }
}


class fileFotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props.formData };
    }

    render() {
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
}



const fields = {
    numCadenamiento: numCadenamiento,
    numEntero: numEntero,
    // fotos: fileFotos,
    numYear: numYear,
    textArea: textArea
}

export { fields }