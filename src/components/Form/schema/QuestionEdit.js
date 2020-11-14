export default {
  type: "object",
  properties: {
    title: {
      title: "题干",
      type: "string",
      format: "textarea",
    },
    difficult: {
      title: "难度",
      type: "string",
      enum: ["易", "中", "难"],
    },
    type: {
      title: "类型",
      type: "string",
      enum: ["single", "multi", "trueFalse"],
      enumNames: ["单选", "双选", "判断"],
      "ui:readonly": true,
    },
    detail: {
      title: "编辑选项",
      type: "string",
      "ui:widget": "questionDetail",
      "ui:options": (FormData) => ({
        quesType: FormData.type,
      }),
    },
  },
};
