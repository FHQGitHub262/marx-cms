import React from "react";
import "./index.less";
import { Row } from "antd";

export default props => {
  return (
    <Row
      className="container"
      style={{
        padding: 16
      }}
    >
      {props.children}
    </Row>
  );
};
