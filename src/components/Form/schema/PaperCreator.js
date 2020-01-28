export default {
  type: "object",
  properties: {
    singleNum: {
      title: "单选题目数",
      type: "number",
      default: 0
    },
    singleList: {
      title: "单选题范围选择",
      type: "string",
      "ui:disabled": (formData, rootValue) => formData.singleNum <= 0,
      default: "{}"
    },
    multiNum: {
      title: "多选题目数",
      type: "number",
      default: 0
    },
    multiList: {
      title: "多选题范围选择",
      type: "string",
      "ui:disabled": (formData, rootValue) => formData.multiNum <= 0,
      default: "{}"
    },
    truefalseNum: {
      title: "判断题目数",
      type: "number",
      default: 0
    },
    truefalseList: {
      title: "判断题范围选择",
      type: "string",
      "ui:disabled": formData => formData.truefalseNum <= 0,
      default: "{}"
    }
    // select: {
    //   title: "单选",
    //   type: "string",
    //   enum: ["a", "b", "c"]
    // }
  }
};
