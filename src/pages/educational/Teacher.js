import React, { useState, useEffect, useContext } from "react";
import { Row, Divider, Button, notification } from "antd";
import Context from "../../context";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import Pop from "../../components/Pop";
import { TeacherCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import beforeSubmit from "../../lib/beforeSubmit";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const context = useContext(Context);
  const changePop = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    if (Object.keys(context.userInfo).length > 0) {
      GET("/educational/teachers", { id: 1 }).then(res => {
        // console.log(res);
        setRaw(res.data || []);
      });
    } else {
      console.log("here", context.userInfo);
    }
  }, [context.userInfo]);

  const resetPassword = record => {
    POST("/user/resetPassword", record).then(res => {
      console.log(res);
    });
  };

  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          if (beforeSubmit(context.teacherCreator)) {
            POST("/educational/createTeacher", context.teacherCreator.data)
              .then(res => {
                changePop();
                notification.success({
                  message: "创建成功"
                });
              })
              .catch(e => {
                notification.error({
                  message: "创建失败",
                  duration: 2
                });
              });
          }
        }}
      >
        <TeacherCreator />
      </Pop>
      <Header
        title="教师管理"
        action={{
          name: "添加教师",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <Row>
          <SortTable
            columns={[
              {
                title: "工号",
                dataIndex: "id"
              },
              {
                title: "姓名",
                dataIndex: "name"
              },
              {
                title: "操作",
                render: (text, record) => (
                  <span>
                    <Button
                      onClick={() => {
                        resetPassword({ uuid: record.UserUuid });
                      }}
                    >
                      重置密码
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        // console.log(record);
                      }}
                    >
                      分配课程
                    </Button>
                  </span>
                )
              }
            ]}
            actions={[
              {
                title: "提交",
                handler: selected => {
                  console.log(selected);
                }
              }
            ]}
            data={raw}
          />
        </Row>
      </Container>
    </div>
  );
};
