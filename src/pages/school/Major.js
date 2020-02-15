import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import { Row, notification } from "antd";

import { MajorCard } from "../../components/Card";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Pop from "../../components/Pop";
import { MajorCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState([]);

  const context = useContext(Context);
  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    console.log(props.location.query);
    GET("/school/majors", { id: props.location.query.id }).then(res => {
      console.log(res);
      setRaw(res.data || []);
    });
  };

  useEffect(() => {
    if (props.location.query && context.userInfo) {
      init();
    } else {
      props.history.push("/school/college");
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
          if (beforeSubmit(context.majorCreator)) {
            POST("/school/createMajor", {
              ...context.majorCreator.data,
              college: props.location.query.id
            })
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
        <MajorCreator />
      </Pop>
      <Header
        title="专业一览"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加专业",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <Row>
          {raw.map(major => (
            <MajorCard
              key={major.id}
              id={major.id}
              majorName={major.name}
              classNum={major.classNum}
              handler={item => {
                props.history.push({
                  pathname: "/school/class",
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
