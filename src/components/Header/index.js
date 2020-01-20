import React from "react";
import "./index.less";

import { PageHeader, Button } from "antd";
export default props => {
  let nextProps = {
    ...props,
    extra:
      props.action !== undefined ? (
        <Button onClick={props.action.handler}>{props.action.name}</Button>
      ) : (
        undefined
      )
  };
  return (
    <PageHeader
      style={{
        border: "1px solid rgb(235, 237, 240)"
      }}
      title={props.title || "Title"}
      {...nextProps}
    />
  );
};
