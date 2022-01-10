import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './App.css';
import { Form } from '../_components/Form'
import json_schema from '../_form/incidencia/schema.json';
import ui_schema from '../_form/incidencia/ui.json';

function App() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5MTU0OTMsImlkIjo2LCJkb21pbmlvIjoyLCJjdWVudGEiOiJnZXJlbnRlMDFfbW9lbiIsIm5vbWJyZSI6IkVsZ2VyIEVudGVcbiBVbm8iLCJyb2wiOiJnZXJlbnRlX3N1cGVydmlzb3IifQ.AVKILBDPbqG2WLKx1e-JM0Kj2s8emXPj3klq2O-OBxQ')
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
