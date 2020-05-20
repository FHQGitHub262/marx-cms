import React, { useEffect } from "react";
import { Slider, Icon } from "antd";

import { useState } from "react";

export default (props) => {
  const max = 10;
  const min = 0;
  let value, handleChange;
  try {
    [value, handleChange] = useState(
      JSON.parse((props.rootValue || {})[props.name]) || [3, 7]
    );
  } catch (error) {
    [value, handleChange] = useState([3, 7]);
  }

  const mid = ((max - min) / 2).toFixed(5);

  useEffect(() => {
    props.onChange(props.name, JSON.stringify(value));
  }, [value]);

  return (
    <div className="icon-wrapper" style={{ display: "flex", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Icon
          style={{ color: value >= mid ? "" : "rgba(0, 0, 0, .45)" }}
          type="frown-o"
        />
        简单
      </div>
      <Slider
        max={10}
        min={0}
        range
        defaultValue={[3, 7]}
        onChange={handleChange}
        style={{ flex: 1, margin: 12 }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Icon
          style={{ color: value >= mid ? "rgba(0, 0, 0, .45)" : "" }}
          type="smile-o"
        />{" "}
        困难
      </div>
    </div>
  );
};
