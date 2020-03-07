import Home from "../pages/Home";
// Educational
import Teacher from "../pages/educational/Teacher";
import Subject from "../pages/educational/Subject";
import Course from "../pages/educational/Course";
import Exam from "../pages/educational/Exam";
import ExamInfo from "../pages/educational/ExamInfo";
import Chapter from "../pages/educational/Chapter";
import Question from "../pages/educational/Question";
import CourseStudent from "../pages/educational/Student";
// Examination
// import Quiz from "../pages/examination/Quiz";
import Paper from "../pages/examination/Paper";
// School
import Classes from "../pages/school/Classes";
import College from "../pages/school/College";
import Major from "../pages/school/Major";
import Student from "../pages/school/Student";

export default [
  {
    exact: true,
    path: "/",
    name: "首页",
    icon: "desktop",
    component: Home
  },
  {
    path: "/instruction",
    name: "教学管理",
    icon: "desktop",
    component: Home
  },
  {
    path: "/educational",
    name: "教务管理",
    icon: "desktop",
    routes: [
      {
        path: "/educational/teacher",
        component: Teacher,
        name: "教师管理",
        display: true,
        admin: true
      },
      {
        path: "/educational/subject",
        component: Subject,
        name: "学科管理",
        display: true
        // admin: true
      },
      {
        path: "/educational/course",
        component: Course,
        name: "课程管理"
      },
      {
        path: "/educational/student",
        component: CourseStudent,
        name: "课程管理"
      },
      {
        path: "/educational/exam",
        component: Exam,
        name: "测验管理"
      },
      {
        path: "/educational/examinfo",
        component: ExamInfo,
        name: "考试信息"
      },
      {
        path: "/educational/chapter",
        component: Chapter,
        name: "章节管理"
      },
      {
        path: "/educational/question",
        component: Question,
        name: "题目管理"
      }
    ]
  },
  {
    path: "/examination",
    name: "考务管理",
    icon: "desktop",
    routes: [
      {
        path: "/examination/quiz",
        name: "测验管理",
        component: Exam,
        display: true
      },
      {
        path: "/examination/paper",
        name: "试卷管理",
        component: Paper,
        display: true
      }
    ]
  },
  {
    path: "/school",
    name: "学籍管理",
    icon: "mobile",
    admin: true,
    routes: [
      {
        path: "/school/college",
        name: "学院一览",
        component: College,
        display: true
      },
      {
        path: "/school/major",
        name: "专业管理",
        component: Major
      },
      {
        path: "/school/class",
        name: "班级管理",
        component: Classes
      },
      {
        path: "/school/student",
        name: "学生管理",
        component: Student
      }
    ]
  }
];
