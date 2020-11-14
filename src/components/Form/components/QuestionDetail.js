import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";

export default (props) => {
  const [options, setOptions] = useState({});
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const value = JSON.parse(props.value);
    switch (props.options.quesType) {
      case "multi":
      case "single": {
        setOptions(value);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (edit === false) {
      props.onChange(props.name, JSON.stringify(options));
    }
  }, [edit]);
  return (
    <div>
      <Button onClick={() => setEdit(!edit)}>
        {edit ? "保存修改" : "修改选项"}
      </Button>
      {edit
        ? Object.keys(options).map((item, index) => {
            return (
              <Input
                prefix={item}
                onChange={(e) => {
                  const next = {
                    ...options,
                    [item]: e.target.value,
                  };
                  setOptions(next);
                }}
                key={item}
                value={options[item]}
              />
            );
          })
        : Object.keys(options).map((item, index) => {
            return (
              <div key={item}>
                {item}: {options[item]}
              </div>
            );
          })}
    </div>
  );
};
