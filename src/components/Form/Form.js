import React, {
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
} from "react";
import FormRender from "form-render/lib/antd";
import { notification } from "antd";
import Context from "../../context";

import CoursePicker from "./components/CoursePicker";
import StudentSelector from "./components/StudentSelector";
import QuestionSelector from "./components/QuestionSelector";
import SubjectSelector from "./components/SubjectSelector";
import PaperSelector from "./components/PaperSelector";
import CourseSelector from "./components/CourseSelector";
import TeacherSelector from "./components/TeacherSelector";
import Uploader from "./components/Uploader";
import QuestionLimiter from "./components/QuestionLimiter";
import DifficultSlider from "./components/DifficultSlider";

export default React.forwardRef((props, ref) => {
  const context = useContext(Context);
  const [formData, setData] = useState(context[props.formName] || {});
  const [valid, setValid] = useState([]);
  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    if (valid.length > 0) {
      notification.warn({ message: `校验未通过字段：${valid.toString()}` });
    }
    return [valid.length === 0, formData];
  };
  useImperativeHandle(ref, () => ({
    submit: onSubmit,
  }));

  useEffect(() => {
    context["update_" + (props.formName || "login")]({
      data: formData,
      valid,
    });
    // console.log(context, formData);
  }, [formData, valid]);

  return (
    <FormRender
      propsSchema={props.schema}
      // uiSchema={uiSchema}
      formData={formData}
      onChange={setData}
      onValidate={setValid}
      widgets={{
        coursePicker: CoursePicker,
        studentSelector: StudentSelector,
        questionSelector: QuestionSelector,
        subjectSelector: SubjectSelector,
        paperSelector: PaperSelector,
        courseSelector: CourseSelector,
        teacherSelector: TeacherSelector,
        uploader: Uploader,
        questionLimiter: QuestionLimiter,
        difficultSlider: DifficultSlider,
      }}
    />
  );
});
