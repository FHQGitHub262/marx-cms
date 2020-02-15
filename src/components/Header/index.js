import React, { useContext } from "react";
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
        border: "1px solid var(--background-color)",
        background: "var(--background-color)"
      }}
      title={props.title || "Title"}
      {...nextProps}
    />
  );
};
