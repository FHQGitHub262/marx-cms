export default {
  type: "object",
  properties: {
    name: {
      title: "学院名称",
      type: "string"
      // "ui:width": "50%" // uiSchema 可以合并到 propsSchema 中（推荐写法，书写便捷）
    },
    studentList: {
      title: "选择学生",
      type: "string"
    }
    // select: {
    //   title: "单选",
    //   type: "string",
    //   enum: ["a", "b", "c"]
    // }
  }
};
