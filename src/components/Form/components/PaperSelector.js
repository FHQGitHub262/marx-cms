import React, { useEffect, useState, useMemo } from "react";
import { Select } from "antd";
import { GET } from "../../../lib/fetch";
const { Option } = Select;

export default props => {
  const [raw, setRaw] = useState([]);

  const onChange = value => {
    props.onChange(props.name, value);
  };
  const type = useMemo(() => {
    return props.disabled;
  }, [props]);

  useEffect(() => {
    GET("/examination/papers", {
      usage: type
    }).then(res => {
      setRaw(res.data || []);
    });
  }, [type]);

  return (
    <Select
      // disabled={props.disabled}
      showSearch
      style={{ width: "100%" }}
      placeholder="选择试卷"
      optionFilterProp="children"
      onChange={onChange}
      defaultValue={props.value}
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
//   (prev, next) => {
//     if (!prev) return false;
//     return prev.disabled === next.disabled;
//   }
// );
