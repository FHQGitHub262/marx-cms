import React, { useState, useEffect, useMemo } from "react";
import { InputNumber } from "antd";
import { GET } from "../../../lib/fetch";

export default (props) => {
  const [chapters, updateChapters] = useState([]);
  const [limited, updateLimited] = useState(() => {
    try {
      if (props.value === "") {
        return {};
      } else {
        return JSON.parse(props.value);
      }
    } catch (error) {
      return {}
    }
  });

  const selected = useMemo(() => props.options.subject, [props]);
  useEffect(() => {
    console.log(selected)
    selected !== "" &&
      GET("/educational/chapters", { id: selected }).then(({ data }) => {
        updateChapters(data);
        updateLimited(
          data.reduce((prev, curr) => {
            const nextValue = limited[curr.id] ? limited[curr.id] : 10
            return {
              ...prev,
              [curr.id]: nextValue,
            };
          }, {})
        );
      });
  }, [selected]);

  useEffect(() => {
    console.log(limited)
    props.onChange(props.name, JSON.stringify(limited));
  }, [limited]);

  return (
    <div style={{ margin: 12 }}>
      {chapters.map((item) => (
        <div key={item.id}>
          <label>{item.name}</label>
          <InputNumber
            style={{ marginLeft: 12 }}
            value={limited[item.id]}
            placeholder="填写上限"
            onChange={(value) => {
              updateLimited({
                ...limited,
                [item.id]: value,
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};
