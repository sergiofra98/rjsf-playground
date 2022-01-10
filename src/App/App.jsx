import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './App.css';
import { Form } from '../_components/Form'
import json_schema from '../_form/incidencia/schema.json';
import ui_schema from '../_form/incidencia/ui.json';

function App() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

<<<<<<< HEAD
  console.log('formData app', formData)
  localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDEzNzcxNzMsImlkIjoyLCJkb21pbmlvIjoxLCJjdWVudGEiOiJnZXJlbnRlMDFfanlyZWgiLCJub21icmUiOiJEYW50ZSBIZXJuXHUwMGUxbmRleiIsInJvbCI6ImdlcmVudGVfc3VwZXJ2aXNvciJ9.LorkGXZ6k2nMEclVoRTaktQD1iHVilPveL_Jd15jeYo')
=======
  localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE1NDgyOTYsImlkIjoyLCJkb21pbmlvIjoxLCJjdWVudGEiOiJnZXJlbnRlMDFfanlyZWgiLCJub21icmUiOiJEYW50ZSBIZXJuXHUwMGUxbmRleiIsInJvbCI6ImdlcmVudGVfc3VwZXJ2aXNvciJ9.HgtAP1hOsU1dBcTSot4RoO2dXLgXc5Ulwhtg597DBlw')
>>>>>>> fdbe280c25ec0c38e0db6002137be84e49678c5a
  return (
    <div className="bg-light container-fluid h-100">
      <Form
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
