import React, { useEffect } from "react";
import { Slider, Icon } from "antd";

import { useState } from "react";

export default (props) => {
  const max = 10;
  const min = 0;
  let value, handleChange;

  [value, handleChange] = useState(() => {
    try {
      console.log('state', props.value)
      if (props.range === "") {
        return [3, 7];
      }
      let range = JSON.parse(props.value || "[]");
      if(typeof range === 'string') range = JSON.parse(range)
      console.log("range", range)
      if (range.length <= 0) {
        return [3, 7];
      } else {
        return range;
      }
    } catch (error) {
      return [3, 7]
    }
  });


  const mid = ((max - min) / 2).toFixed(5);

  // useEffect(() => {
  //   if (props.value === "" && ) {
  //     props.onChange(props.name, JSON.stringify([3, 7]));
  //   }
  //   const range = JSON.parse(props.value || "[]");

  //   props.onChange(
  //     props.name,
  //     (() => {
  //       if (range.length <= 0) {
  //         return [3, 7];
  //       } else {
  //         return range;
  //       }
  //     })()
  //   );
  //   // console.log(JSON.parse((props.rootValue || "{}")[props.name]));
  // }, []);

  useEffect(() => {
    console.log('value', value)
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
        // tooltipVisible={true}
        max={10}
        min={0}
        marks={Array(10)
          .fill(0)
          .reduce(
            (prev, item, index) => ({ ...prev, [index]: String(index) }),
            {}
          )}
        range
        value={value}
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
