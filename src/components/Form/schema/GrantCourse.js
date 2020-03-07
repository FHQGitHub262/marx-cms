export default {
  type: "object",
  properties: {
    courseId: {
      title: "选择课程",
      type: "string",
      "ui:widget": "coursePicker"
      // "ui:width": "50%" // uiSchema 可以合并到 propsSchema 中（推荐写法，书写便捷）
    }
  }
};
