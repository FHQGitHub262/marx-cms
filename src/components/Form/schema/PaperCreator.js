export default {
  type: "object",
  properties: {
    name: {
      title: "试卷名称",
      type: "string",
    },
    chapter: {
      title: "使用学科",
      type: "string",
      "ui:widget": "subjectSelector",
    },
    forExam: {
      title: "用于正式考试",
      type: "boolean",
    },
    ratio: {
      title: "难度比例",
      type: "string",
      "ui:widget": "difficultSlider",
    },
    limiter: {
      title: "各章节出题数限制",
      type: "string",
      "ui:widget": "questionLimiter",
      "ui:options": (formData, rootValue) => ({
        subject: formData.chapter,
      }),
    },
    singleNum: {
      title: "单选题目数",
      type: "number",
      default: 0,
    },
    singleList: {
      title: "单选题范围选择",
      type: "array",
      "ui:disabled": (formData, rootValue) => formData.singleNum <= 0,
      "ui:widget": "questionSelector",
      "ui:options": (formData) => ({
        type: "single",
        forExam: formData.forExam,
      }),
      default: [],
    },
    multiNum: {
      title: "多选题目数",
      type: "number",
      default: 0,
    },
    multiList: {
      title: "多选题范围选择",
      type: "array",
      "ui:disabled": (formData) => formData.multiNum <= 0,
      "ui:widget": "questionSelector",
      "ui:options": (formData) => ({
        type: "multi",
        forExam: formData.forExam,
      }),
      default: [],
    },
    truefalseNum: {
      title: "判断题目数",
      type: "number",
      default: 0,
    },
    truefalseList: {
      title: "判断题范围选择",
      type: "array",
      "ui:disabled": (formData) => formData.truefalseNum <= 0,
      "ui:widget": "questionSelector",
      "ui:options": (formData) => ({
        type: "trueFalse",
        forExam: formData.forExam,
      }),
      default: [],
    },

    // select: {
    //   title: "单选",
    //   type: "string",
    //   enum: ["a", "b", "c"]
    // }
  },
};
