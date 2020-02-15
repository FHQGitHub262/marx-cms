import React from "react";
import "./index.less";

import { Avatar } from "antd";
export default props => {
  return (
    <div className="usercard">
      <Avatar
        style={{ verticalAlign: "middle", fontSize: 128 }}
        size={props.size || 128}
      >
        {props.name || "欢迎"}
      </Avatar>
      <h2>{props.name || ""}</h2>
      <h3>
        <label>
          {JSON.parse(props.privilege || "[]") instanceof Array &&
            JSON.parse(props.privilege || "[]").length > 0 &&
            "权限："}
        </label>
        {JSON.parse(props.privilege || "[]").join(" ")}
      </h3>
    </div>
  );
};
