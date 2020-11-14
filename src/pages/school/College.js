import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import { Row, Button } from "antd";
import SortTable from "../../components/SortTable";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Pop from "../../components/Pop";
import { CollegeCreator, StudentImporter } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import { notification } from "antd";
import ClassSelector from "../../components/ClassSelector";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const context = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [raw, setRaw] = useState([]);
  const [selector, setSelector] = useState({});
  const changePop = () => {
    setVisible(!visible);
  };
  const changeImportPop = () => {
    setImportVisible(!importVisible);
  };

  const init = () => {
    setLoading(true);
    GET("/school/students", { id: selector.class }).then((res) => {
      setRaw(res.data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (
      selector.college !== undefined &&
      selector.major !== undefined &&
      selector.class !== undefined
    )
      init();
  }, [selector]);

  return (
    <div>
      <Pop
        visible={importVisible}
        handleOk={() => {
          if (beforeSubmit(context.studentImporter)) {
            console.log(context.studentImporter);
            POST("/school/student/import", {
              filename: context.studentImporter.data.id,
              college: selector.college,
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
          // console.log(context.subjectCreator);
          if (beforeSubmit(context.collegeCreator)) {
            POST("/school/createCollege", context.collegeCreator.data)
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
        <CollegeCreator />
      </Pop>
      <Header
        title="学院一览"
        action={{
          disabled: selector.college !== undefined,
          name: "导入学生",
          handler: () => {
            changeImportPop();
          },
        }}
        actions={[<Button onClick={() => changePop()}>添加学院</Button>]}
      />

      <Container>
        <ClassSelector onChange={(e) => setSelector(e)} />
        <Row>
          <SortTable
            loading={loading}
            data={raw}
            columns={[
              {
                title: "学号",
                dataIndex: "idNumber",
              },
              {
                title: "姓名",
                dataIndex: "name",
              },
              {
                title: "操作",
                render: (text, record) => (
                  <span>
                    <Button
                      href="#"
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      重置密码
                    </Button>
                  </span>
                ),
              },
            ]}
            keyName="UserUuid"
          />
        </Row>
      </Container>
    </div>
  );
};
