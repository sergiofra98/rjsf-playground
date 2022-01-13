import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { FormComp } from '../_components/Form'
import { auxiliarActions } from '../_actions';

function App() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const storeSchema = useSelector((state) => state.auxiliar.form_incidencia);

  useEffect(() => {
    if (!storeSchema["json_schema"]) {
      dispatch(auxiliarActions.getFormIncidencia());
    }
  }, []);

  localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIxNTYwNzgsImlkIjoyLCJkb21pbmlvIjoxLCJjdWVudGEiOiJnZXJlbnRlMDFfanlyZWgiLCJub21icmUiOiJEYW50ZSBIZXJuXHUwMGUxbmRleiIsInJvbCI6ImdlcmVudGVfc3VwZXJ2aXNvciJ9.QC7Rs3ORnX3aMyPMVouV378pxya5wHDlJGaCUTn61AU')
  return (
    <div className="bg-light container-fluid h-100">
      <FormComp
        disabled={false}
        data={formData}
        form_schema={storeSchema}
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
