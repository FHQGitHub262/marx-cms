import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import { Row } from "antd";

import { CollegeCard } from "../../components/Card";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Pop from "../../components/Pop";
import { CollegeCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import { notification } from "antd";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState([]);
  const changePop = () => {
    setVisible(!visible);
  };
  const context = useContext(Context);

  const init = () => {
    GET("/school/colleges", { id: 1 }).then(res => {
      console.log(res);
      setRaw(res.data || []);
    });
  };

  useEffect(() => {
    if (context.userInfo) {
      init();
    }
  }, []);

  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
        handleOk={() => {
          // console.log(context.subjectCreator);
          if (beforeSubmit(context.collegeCreator)) {
            POST("/school/createCollege", context.collegeCreator.data)
              .then(res => {
                notification.success({ message: "创建成功", duration: 2 });
                changePop();
                init();
              })
              .catch(e => {
                notification.error({
                  message: "创建出错",
                  duration: 2
                });
              });
          }
        }}
      >
        <CollegeCreator />
      </Pop>
      <Header
        title="学院一览"
        action={{
          name: "添加学院",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <Row>
          {raw.map(college => (
            <CollegeCard
              key={college.id}
              id={college.id}
              collegeName={college.name}
              majorNum={college.majorNum}
              classNum={college.classNum}
              handler={item => {
                props.history.push({
                  pathname: "/school/major",
                  query: item
                });
              }}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};
