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
        {props.name || "Temp"}
      </Avatar>
      <h2>{props.name || "Temp"}</h2>
      <h3>
        <label>权限：</label>
        {(props.privilege || ["系统管理员"]).join(" ")}
      </h3>
    </div>
  );
};
