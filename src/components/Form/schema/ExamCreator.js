export default {
  type: "object",
  properties: {
    name: {
      title: "测验名称",
      type: "string"
      // "ui:width": "50%" // uiSchema 可以合并到 propsSchema 中（推荐写法，书写便捷）
    },
    type: {
      title: "类型",
      type: "string",
      enum: ["true", "false"],
      enumNames: ["大考", "小练习"]
    },
    startAt: {
      title: "开始时间",
      type: "string",
      format: "dateTime"
    },
    endAt: {
      title: "结束时间",
      type: "string",
      format: "dateTime"
    },
    paperId: {
      title: "选择试卷",
      type: "string",
      "ui:widget": "paperSelector",
      "ui:disabled": FormData => FormData.type === "true"
    },
    range: {
      title: "选择参考范围",
      type: "string",
      "ui:widget": "courseSelector"
    }
  }
};
