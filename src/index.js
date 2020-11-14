import React, { useState } from "react";
import ReactDOM from "react-dom";
import zhCN from "antd/es/locale/zh_CN";

import App from "./App";
import { ConfigProvider } from "antd";
import { HashRouter } from "react-router-dom";
// import * as serviceWorker from "./serviceWorker";
import "./index.less";

import Context from "./context";

const Component = () => {
  const [loginform, update_loginform] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [questionEdit, update_questionEdit] = useState({});
  const [collegeCreator, update_collegeCreator] = useState({});
  const [courseGranter, update_courseGranter] = useState({});
  const [chapterCreator, update_chapterCreator] = useState({});
  const [classCreator, update_classCreator] = useState({});
  const [courseCreator, update_courseCreator] = useState({});
  const [examCreator, update_examCreator] = useState({});
  const [majorCreator, update_majorCreator] = useState({});
  const [paperCreator, update_paperCreator] = useState({});
  const [studentAdder, update_studentAdder] = useState({});
  const [studentImporter, update_studentImporter] = useState({});
  const [subjectCreator, update_subjectCreator] = useState({});
  const [teacherCreator, update_teacherCreator] = useState({});
  const [questionImporter, update_questionImporter] = useState({});

  return (
    <ConfigProvider locale={zhCN}>
      <Context.Provider
        value={{
          loginform,
          update_loginform,
          userInfo,
          setUserInfo,
          collegeCreator,
          update_collegeCreator,
          chapterCreator,
          update_chapterCreator,
          classCreator,
          courseGranter,
          update_courseGranter,
          update_classCreator,
          courseCreator,
          update_courseCreator,
          examCreator,
          update_examCreator,
          majorCreator,
          update_majorCreator,
          paperCreator,
          update_paperCreator,
          studentAdder,
          update_studentAdder,
          studentImporter,
          update_studentImporter,
          subjectCreator,
          update_subjectCreator,
          teacherCreator,
          update_teacherCreator,
          questionImporter,
          update_questionImporter,
          questionEdit,
          update_questionEdit,
        }}
      >
        <HashRouter>
          <App />
        </HashRouter>
      </Context.Provider>
    </ConfigProvider>
  );
};

ReactDOM.render(<Component />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
