import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './App.css';
import { FormComp } from '../_components/Form'
import json_schema from '../_form/incidencia/schema.json';
import ui_schema from '../_form/incidencia/ui.json';

function App() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  console.log('formData app', formData)
  localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIyNDYwOTYsImlkIjoyLCJkb21pbmlvIjoxLCJjdWVudGEiOiJnZXJlbnRlMDFfanlyZWgiLCJub21icmUiOiJFbGdlciBFbnRlXG4gVW5vIiwicm9sIjoiZ2VyZW50ZV9zdXBlcnZpc29yIn0.7Cb3s7PEXuEoc_m7OCbakCMWWxC-OupPVZcC4_GHC7I')
  return (
    <div className="bg-light container-fluid h-100">
      <FormComp
        disabled={false}
        data={formData}
        form_schema={{ json_schema, ui_schema }}
        setData={setFormData}
        calculando={false}
        setCalculando={null}
        dispatch={dispatch}
      // validate={validate}
      // validated={validated}
      // setValidated={setValidated}
      />
    </div>
  );
}

export { App };
