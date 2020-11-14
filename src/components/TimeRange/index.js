import { DatePicker } from "antd";

import React from "react";

const { RangePicker } = DatePicker;

export default (props) => {
  const onChange = (date, dateString) => {
    (props.onChange || (() => {}))(
      dateString.map((item, index) =>
        new Date(`${item} ${index === 0 ? "00:00:00" : "23:59:59"}`).getTime()
      )
    );
  };
  return (
    <div
      style={{
        marginLeft: 16,
      }}
    >
      <RangePicker onChange={onChange} />
    </div>
  );
};
