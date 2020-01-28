import React from "react";
import Form from "./Form";

import login from "./schema/Login";
import collegeCreator from "./schema/CollegeCreator";
import chapterCreator from "./schema/ChapterCreator";
import classCreator from "./schema/ClassCreator";
import courseCreator from "./schema/CourseCreator";
import examCreator from "./schema/ExamCreator";
import majorCreator from "./schema/MajorCreator";
import paperCreator from "./schema/PaperCreator";
import studentAdder from "./schema/StudentAdder";
import studentImporter from "./schema/StudentImporter";
import subjectCreator from "./schema/SubjectCreator";
import teacherCreator from "./schema/TeacherCreator";
import questionImporter from "./schema/QuestionImporter";

export const Login = () => <Form schema={login} />;
export const CollegeCreator = () => <Form schema={collegeCreator} />;
export const ChapterCreator = () => <Form schema={chapterCreator} />;
export const ClassCreator = () => <Form schema={classCreator} />;
export const CourseCreator = () => <Form schema={courseCreator} />;
export const ExamCreator = () => <Form schema={examCreator} />;
export const MajorCreator = () => <Form schema={majorCreator} />;
export const PaperCreator = () => <Form schema={paperCreator} />;
export const StudentAdder = () => <Form schema={studentAdder} />;
export const StudentImporter = () => <Form schema={studentImporter} />;
export const SubjectCreator = () => <Form schema={subjectCreator} />;
export const TeacherCreator = () => <Form schema={teacherCreator} />;
export const QuestionImporter = () => <Form schema={questionImporter} />;
