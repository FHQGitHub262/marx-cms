export default {
  type: "object",
  properties: {
    name: {
      title: "学科名称",
      type: "string",
      // "ui:width": "50%" // uiSchema 可以合并到 propsSchema 中（推荐写法，书写便捷）
    },
    pic: {
      title: "学科图片",
      type: "string",
      "ui:widget": "uploader",
    },
    // studentList: {
    //   title: "学生选择",
    //   type: "string"
    // }
    // select: {
    //   title: "单选",
    //   type: "string",
    //   enum: ["a", "b", "c"]
    // }
  },
};
