import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Radio, InputNumber } from "antd";
import { GET } from "../../../lib/fetch";

export default (props) => {
  const [chapters, updateChapters] = useState([]);
  // const [limited, updateLimited] = useState({});
  let limited, updateLimited;
  try {
    [limited, updateLimited] = useState(
      JSON.parse((props.rootValue || {})[props.name]) || {}
    );
  } catch (error) {
    [limited, updateLimited] = useState({});
  }
  const selected = useMemo(() => props.options.subject);
  useEffect(() => {
    console.log(selected);
    selected !== "" &&
      GET("/educational/chapters", { id: selected }).then(({ data }) => {
        updateChapters(data);
        updateLimited(
          data.reduce((prev, curr) => {
            return {
              ...prev,
              [curr.id]: "MAX",
            };
          }, {})
        );
      });
  }, [selected]);

  useEffect(() => {
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
