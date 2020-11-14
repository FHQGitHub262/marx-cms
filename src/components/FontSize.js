import React, { useState } from "react";
import { Slider, InputNumber, Row, Col } from "antd";

export default () => {
  const [inputValue, setInputValue] = useState(() => {
    const fontLevel = window.localStorage.getItem("fontSize");

    const value = parseInt(fontLevel === null ? "14px" : fontLevel) - 13;
    console.log(window.localStorage.getItem("fontSize"), value);
    return value;
  });
  const [root] = useState(() => document.querySelector(":root"));
  const onChange = (value) => {
    setInputValue(value);
    setFontSize(`${value + 13}px`);
  };

  const setFontSize = throttle((args) => {
    root.style.setProperty("--base-size", args[0]);
    window.localStorage.setItem("fontSize", args[0]);
  }, 500);

  return (
    <div style={{ margin: 16, width: "100%", background: "white" }}>
      <h2
        style={{
          fontSize: "calc(var(--base-size) + 2px)",
        }}
      >
        字体大小
      </h2>
      <Row style={{ justifyContent: "space-around", display: "flex" }}>
        <Col span={12}>
          <Slider
            min={1}
            max={7}
            onChange={onChange}
            value={typeof inputValue === "number" ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={7}
            style={{ marginLeft: 16 }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  );
};

function throttle(fn, gapTime) {
  let _lastTime = null;

  return function (...args) {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.call({}, args);
      _lastTime = _nowTime;
    }
  };
}
