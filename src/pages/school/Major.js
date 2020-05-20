import React, { useState, useEffect, useContext, useMemo } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import { Row, notification, Button } from "antd";

import { MajorCard } from "../../components/Card";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Pop from "../../components/Pop";
import { MajorCreator, StudentImporter } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import { decode, encode } from "../../lib/params";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [raw, setRaw] = useState([]);
  const query = useMemo(() => {
    return decode(props.location.search);
  }, [props]);

  const context = useContext(Context);
  const changePop = () => {
    setVisible(!visible);
  };
  const changeImportPop = () => {
    setImportVisible(!importVisible);
  };

  const init = () => {
    GET("/school/majors", { id: query.id }).then((res) => {
      console.log(res);
      setRaw(res.data || []);
    });
  };

  useEffect(() => {
    if (decode(props.location.search) && context.userInfo) {
      init();
    } else {
      props.history.push("/school/college");
    }
  }, []);

  return (
    <div>
      <Pop
        visible={importVisible}
        handleOk={() => {
          if (beforeSubmit(context.studentImporter)) {
            console.log(context.studentImporter);
            POST("/school/student/import", {
              filename: context.studentImporter.data.id,
              college: query.id,
            })
              .then((res) => {
                notification.success({ message: "添加成功", duration: 2 });
                changeImportPop();
                init();
              })
              .catch((e) => {
                notification.error({
                  message: "添加出错",
                  duration: 2,
                });
              });
          }
        }}
        doHide={() => {
          changeImportPop();
        }}
      >
        <StudentImporter />
      </Pop>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
        handleOk={() => {
          if (beforeSubmit(context.majorCreator)) {
            POST("/school/createMajor", {
              ...context.majorCreator.data,
              college: query.id,
            })
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
      >
        <MajorCreator />
      </Pop>
      <Header
        title="专业一览"
        onBack={() => {
          console.log(props.history);
          props.history.goBack();
        }}
        actions={[
          <Button onClick={changeImportPop} key="2">
            导入学生
          </Button>,
        ]}
        action={{
          name: "添加专业",
          handler: () => {
            changePop();
          },
        }}
      />
      <Container>
        <Row>
          {raw.map((major) => (
            <MajorCard
              key={major.id}
              id={major.id}
              majorName={major.name}
              classNum={major.classNum}
              handler={(item) => {
                props.history.push("/school/class" + encode(item));
              }}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};
