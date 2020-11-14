import React from "react";
import { Descriptions } from "antd";

export default (props) =>
  Object.keys(props).length > 0 && (
    <Descriptions title={props.title} layout="vertical" bordered>
      <Descriptions.Item label="类型">
        {((type) => {
          switch (type) {
            case "single":
              return "单选题";
            case "multi":
              return "双选题";
            case "trueFalse":
              return "判断题";
          }
        })(props.type)}
      </Descriptions.Item>
      <Descriptions.Item label="用途">
        {props.usage ? "大考" : "小考"}
      </Descriptions.Item>
      <Descriptions.Item label="状态">
        {props.enable ? "正常" : "禁用"}
      </Descriptions.Item>
      <Descriptions.Item label="正确答案">
        {JSON.parse(props.right)
          .map((item) => {
            if (typeof item === "boolean") {
              return item ? "✔" : "❌";
            } else return item;
          })
          .join("、")}
      </Descriptions.Item>
      {props.type !== "trueFalse" && (
        <Descriptions.Item label="选项">
          {((detail) => {
            detail = JSON.parse(detail);

            return Object.keys(detail).map((choice) => (
              <li key={choice}>
                {choice}：{detail[choice]}
              </li>
            ));
          })(props.detail)}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
