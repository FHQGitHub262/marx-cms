export default {
  type: "object",
  properties: {
    id: {
      title: "登录账号",
      type: "string",
    },
    password: {
      title: "登录密码",
      type: "string",
      format: "password",
    },
  },
};
