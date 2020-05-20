import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { GET } from "../../../lib/fetch";
const { Option } = Select;

export default props => {
  const [raw, setRaw] = useState([]);

  const onChange = value => {
    props.onChange(props.name, value);
  };

  useEffect(() => {
    GET("/educational/subjects").then(res => {
      // console.log(res);
      setRaw(res.data || []);
    });
  }, []);

  return (
    <Select
      disabled={props.disabled}
      showSearch
      style={{ width: "100%" }}
      placeholder="选择学科"
      optionFilterProp="children"
      onChange={onChange}
      defaultValue={[props.value]}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {raw.map(item => (
        <Option value={item.id} key={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};
