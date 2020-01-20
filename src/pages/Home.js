import React, { useState } from "react";
import UserInfo from "../components/UserInfo";
import FormRender from "form-render/lib/antd";
import FormTest from "../components/FormTest";

const styles = {
  home: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%"
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

const propsSchema = {
  type: "object",
  properties: {
    string: {
      title: "字符串",
      type: "string",
      "ui:width": "50%" // uiSchema 可以合并到 propsSchema 中（推荐写法，书写便捷）
    },
    select: {
      title: "单选",
      type: "string",
      enum: ["a", "b", "c"]
    }
  }
};

export default props => {
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);
  return (
    <div style={styles.home}>
      <div></div>
      <div style={styles.main}>
        <UserInfo />
        <FormTest />
        <FormRender
          propsSchema={propsSchema}
          // uiSchema={uiSchema}
          formData={formData}
          onChange={setData}
          onValidate={setValid}
        />
      </div>
    </div>
  );
};
