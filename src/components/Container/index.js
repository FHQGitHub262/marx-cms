import React from "react";
import "./index.less";
import { Row } from "antd";

export default props => {
  return (
    <Row
      className="container"
      gutter={[24, 16]}
      style={{
        margin: 16
      }}
    >
      {props.children}
    </Row>
  );
};
