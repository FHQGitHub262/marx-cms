import React, { useState } from "react";
import FormRender from "form-render/lib/antd";

export default props => {
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);
  return (
    <FormRender
      propsSchema={props.schema}
      // uiSchema={uiSchema}
      formData={formData}
      onChange={setData}
      onValidate={setValid}
    />
  );
};
