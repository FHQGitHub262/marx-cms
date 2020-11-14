export default {
  type: "object",
  properties: {
    name: {
      title: "课程名称",
      type: "string",
      // "ui:width": "50%" // uiSchema 可以合并到 propsSchema 中（推荐写法，书写便捷）
    },
    studentList: {
      title: "选择学生",
      type: "array",
      "ui:widget": "studentSelector",
    },
    teacher: {
      title: "选择负责教师",
      type: "string",
      "ui:widget": "teacherSelector",
    },
    // select: {
    //   title: "单选",
    //   type: "string",
    //   enum: ["a", "b", "c"]
    // }
  },
};
