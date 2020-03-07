import React, { useState, useEffect, useContext } from "react";
import { Row, Divider, Button, notification } from "antd";
import Context from "../../context";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import Pop from "../../components/Pop";
import { TeacherCreator, CourseGranter } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import beforeSubmit from "../../lib/beforeSubmit";

export default props => {
  const [visible, setVisible] = useState(false);
  const [grantVisible, setGrantVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const [active, setActive] = useState(undefined);
  const context = useContext(Context);
  const changePop = () => {
    setVisible(!visible);
  };
  const changeGrantPop = () => {
    setGrantVisible(!grantVisible);
  };
  const init = () => {
    GET("/educational/teachers", { id: 1 }).then(res => {
      // console.log(res);
      setRaw(res.data || []);
    });
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
      {/* 创建教师 */}
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
        handleOk={() => {
          if (beforeSubmit(context.teacherCreator)) {
            POST("/educational/createTeacher", context.teacherCreator.data)
              .then(res => {
                changePop();
                notification.success({
                  message: "创建成功"
                });
                init();
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
      {/* 分配课程弹窗 */}
      <Pop
        visible={grantVisible}
        doHide={() => {
          changeGrantPop();
        }}
        handleOk={() => {
          if (beforeSubmit(context.courseGranter)) {
            console.log(context.courseGranter, active);
            POST("/educational/grantCourse", {
              teacher: [active.UserUuid],
              course: context.courseGranter.data.courseId
            }).then(({ success }) => {
              if (success) {
                notification.success({
                  message: "授权成功"
                });
              } else {
                notification.error({
                  message: "授权失败"
                });
              }
              changeGrantPop();
            });
          }
          console.log("ok");
        }}
      >
        <CourseGranter />
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
                dataIndex: "idNumber"
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
                        setActive(record);
                        changeGrantPop();
                        // console.log(record);
                      }}
                    >
                      分配课程
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        POST("/user/set_admin", {
                          id: record.UserUuid
                        }).then(res => {
                          if (res.success === true) {
                            notification.success({
                              message: "设置成功"
                            });
                          } else {
                            notification.error({
                              message: "设置失败"
                            });
                          }
                          init();
                        });
                      }}
                    >
                      设置为管理员
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
            keyName="UserUuid"
          />
        </Row>
      </Container>
    </div>
  );
};
