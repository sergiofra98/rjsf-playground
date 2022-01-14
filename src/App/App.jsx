import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './App.css';
import { FormComp } from '../_components/Form'
import { auxiliarActions } from '../_actions';
import schema from "../_form/incidencia/schema.json"
import uiSchema from "../_form/incidencia/ui.json"
function App() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  //const storeSchema = useSelector((state) => state.auxiliar.form_incidencia);
  const storeSchema = { json_schema: schema, ui_schema: uiSchema }
  const augSchema = useSelector((state)=> state.auxiliar.form_incidencia.aug)

  useEffect(() => {
    if (!storeSchema["json_schema"]) {
      dispatch(auxiliarActions.getFormIncidencia());
    }
  }, []);

  localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDIyNDYxNjYsImlkIjoyLCJkb21pbmlvIjoxLCJjdWVudGEiOiJnZXJlbnRlMDFfanlyZWgiLCJub21icmUiOiJEYW50ZSBIZXJuXHUwMGUxbmRleiIsInJvbCI6ImdlcmVudGVfc3VwZXJ2aXNvciJ9.emSCbiX_zz6azl0iQ1F12ZQBL5oGISc9rlhj9MR9kFA')
  return (
    <div className="bg-light container-fluid h-100">
      <FormComp
        disabled={false}
        data={formData}
        form_schema={storeSchema}
        aug_schema={augSchema}
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
