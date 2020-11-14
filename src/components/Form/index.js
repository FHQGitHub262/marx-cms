import React from "react";
import Form from "./Form";

import login from "./schema/Login";
import collegeCreator from "./schema/CollegeCreator";
import chapterCreator from "./schema/ChapterCreator";
import classCreator from "./schema/ClassCreator";
import courseCreator from "./schema/CourseCreator";
import examCreator from "./schema/ExamCreator";
import courseGranter from "./schema/GrantCourse";
import majorCreator from "./schema/MajorCreator";
import paperCreator from "./schema/PaperCreator";
import studentAdder from "./schema/StudentAdder";
import studentImporter from "./schema/StudentImporter";
import subjectCreator from "./schema/SubjectCreator";
import teacherCreator from "./schema/TeacherCreator";
import questionImporter from "./schema/QuestionImporter";
import questionEdit from "./schema/QuestionEdit";

export const Login = () => <Form schema={login} formName="loginform" />;
export const CollegeCreator = () => (
  <Form schema={collegeCreator} formName="collegeCreator" />
);
export const ChapterCreator = () => (
  <Form schema={chapterCreator} formName="chapterCreator" />
);
export const ClassCreator = () => (
  <Form schema={classCreator} formName="classCreator" />
);
export const CourseCreator = () => (
  <Form schema={courseCreator} formName="courseCreator" />
);
export const CourseGranter = () => (
  <Form schema={courseGranter} formName="courseGranter" />
);
export const ExamCreator = () => (
  <Form schema={examCreator} formName="examCreator" />
);
export const MajorCreator = () => (
  <Form schema={majorCreator} formName="majorCreator" />
);
export const PaperCreator = () => (
  <Form schema={paperCreator} formName="paperCreator" />
);
export const StudentAdder = () => (
  <Form schema={studentAdder} formName="studentAdder" />
);
export const StudentImporter = () => (
  <Form schema={studentImporter} formName="studentImporter" />
);
export const SubjectCreator = () => (
  <Form schema={subjectCreator} formName="subjectCreator" />
);
export const TeacherCreator = () => (
  <Form schema={teacherCreator} formName="teacherCreator" />
);
export const QuestionImporter = () => (
  <Form schema={questionImporter} formName="questionImporter" />
);
export const QuestionEdit = () => (
  <Form schema={questionEdit} formName="questionEdit" />
);
