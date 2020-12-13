import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import { Row, Button, message } from "antd";
import SortTable from "../../components/SortTable";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Pop from "../../components/Pop";
import { CollegeCreator, StudentImporter, StudentSingleAdder } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import { notification } from "antd";
import ClassSelector from "../../components/ClassSelector";
import config from "../../config";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const context = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [raw, setRaw] = useState([]);
  const [selector, setSelector] = useState({});
  const [inited, setInited] = useState(false)
  const changePop = () => {
    setVisible(!visible);
  };
  const changeAddPop = () => {
    setAddVisible(!addVisible);
  };
  const changeImportPop = () => {
    setImportVisible(!importVisible);
  };

  const init = () => {
    setLoading(true);
    setInited(true)
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
      <Pop
        visible={addVisible}
        doHide={() => {
          changeAddPop();
        }}
        handleOk={() => {
          // console.log(context.subjectCreator);
          if (beforeSubmit(context.studentSingleAdder)) {
            console.log(context.studentSingleAdder.data, selector)

            POST('/school/student/add', {
              ...context.studentSingleAdder.data,
              classId: selector.class
            })
              .then((res) => {
                notification.success({ message: "创建成功", duration: 2 });
                changeAddPop();
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
        <StudentSingleAdder />
      </Pop>
      <Header
        title="学院一览"
        action={{
          disabled: selector.college !== undefined,
          name: "批量导入",
          handler: () => {
            changeImportPop();
          },
        }}
        actions={[
          <Button onClick={() => {

            const link = document.createElement('a');
            //设置下载的文件名
            link.download = `考试系统-学籍模板.xlsx`;
            link.style.display = 'none';
            //设置下载路径
            link.target = '_blank'
            link.href = `${config.suffix}/demo/students.xlsx`;
            //触发点击
            link.click();

          }}>模板下载</Button>,
          <Button onClick={() => changePop()}>添加学院</Button>,
          <Button onClick={() => changeAddPop()} disabled={!(selector.college !== undefined &&
            selector.major !== undefined &&
            selector.class !== undefined)}>单独添加</Button>
        ]}
      />

      <Container>
        <Row>
          <ClassSelector onChange={(e) => setSelector(e)} />

        </Row>

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
                      onClick={() => {
                        console.log(record);
                        POST('/user/resetPassword', {
                          uuid: record.UserUuid
                        }).then(({ success }) => {
                          success ? message.success("重置成功") : message.error("操作失败")
                        })
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
