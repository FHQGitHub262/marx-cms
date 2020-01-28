export default {
  type: "object",
  properties: {
    id: {
      title: "登录id",
      type: "string"
    },
    password: {
      title: "登录密码",
      type: "string",
      format: "password"
    }
  }
};
