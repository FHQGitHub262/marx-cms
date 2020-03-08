import React from "react";
import "./index.less";

import { PageHeader, Button } from "antd";
export default props => {
  let nextProps = {
    ...props,
    extra: [
      ...(props.actions || []),
      props.action !== undefined ? (
        <Button onClick={props.action.handler} key="1">
          {props.action.name}
        </Button>
      ) : (
        undefined
      )
    ]
  };
  return (
    <PageHeader
      style={{
        border: "1px solid var(--background-color)",
        background: "white"
      }}
      title={props.title || "Title"}
      {...nextProps}
    />
  );
};
