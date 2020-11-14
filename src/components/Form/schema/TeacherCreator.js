export default {
  type: "object",
  properties: {
    name: {
      title: "教师名称",
      type: "string",
      // "ui:width": "50%" // uiSchema 可以合并到 propsSchema 中（推荐写法，书写便捷）
    },
    id: {
      title: "登录账号",
      type: "string",
    },
    password: {
      title: "登录密码",
      type: "string",
      format: "password",
      // default: "123456",
    },
    // select: {
    //   title: "单选",
    //   type: "string",
    //   enum: ["a", "b", "c"]
    // }
  },
};
