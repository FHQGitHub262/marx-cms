import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import Header from "../../components/Header";
import Container from "../../components/Container";
import { SubjectCard } from "../../components/Card";
import Pop from "../../components/Pop";
import { SubjectCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import { notification } from "antd";
import { encode } from "../../lib/params";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState([]);
  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (context.userInfo) {
      init();
    }
  }, [context.userInfo]);

  const handleCourse = (item) => {
    props.history.push("/educational/course" + encode(item));
    // props.history.push({ pathname: "/educational/course", query: item });
  };
  const handleChapter = (item) => {
    props.history.push("/educational/chapter" + encode(item));
    // props.history.push({ pathname: "/educational/chapter", query: item });
  };

  const init = () => {
    GET("/educational/subjects").then((res) => {
      // console.log(res);
      setRaw(res.data || []);
    });
  };

  return (
    <div>
      <Pop
        visible={visible}
        handleOk={() => {
          // console.log(context.subjectCreator);
          if (beforeSubmit(context.subjectCreator)) {
            POST("/educational/createSubject", context.subjectCreator.data)
              .then((res) => {
                notification.success({ message: "创建成功", duration: 2 });
                changePop();
                init();
              })
              .catch((e) => {
                notification.error({
                  message: "创建出错",
                  duration: 2,
                });
              });
          }
        }}
        doHide={() => {
          changePop();
        }}
      >
        <SubjectCreator />
      </Pop>
      <Header
        title="学科管理"
        action={
          (context.userInfo.privilege || []).indexOf("admin") >= 0
            ? {
                name: "添加学科",
                handler: () => {
                  changePop();
                },
                disabled: true,
              }
            : undefined
        }
      />
      <Container>
        {raw.map((subject) => (
          <SubjectCard
            id={subject.id}
            key={subject.id}
            name={subject.name}
            // questionNum={subject.majorNum}
            majorNum={subject.majorNum}
            handleCourse={handleCourse}
            handleChapter={handleChapter}
          />
        ))}

        {/* <SubjectCard name="毛概" questionNum={12} chapterNum={3} />
        <SubjectCard name="马原" questionNum={12} chapterNum={3} /> */}
      </Container>
    </div>
  );
};
