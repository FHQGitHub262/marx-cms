import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button, notification } from "antd";
import Pop from "../../components/Pop";
import { CourseCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);

  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    GET("/educational/courses", { id: props.location.query.id }).then(res => {
      console.log(res);
      setRaw(res.data || []);
    });
  };

  useEffect(() => {
    if (props.location.query && context.userInfo) {
      init();
    } else {
      props.history.push("/educational/subject");
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
          if (beforeSubmit(context.courseCreator)) {
            POST("/educational/createCourse", {
              ...context.courseCreator.data,
              subject: props.location.query.id
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
        <CourseCreator />
      </Pop>
      <Header
        title="课程管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加课程",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "课程名称",
              dataIndex: "name"
            },
            // {
            //   title: "人数",
            //   dataIndex: "count"
            // },
            {
              title: "状态",
              dataIndex: "status",
              filters: [
                { text: "进行中", value: "active" },
                { text: "已结束", value: "end" }
              ],
              onFilter: (value, record) => record.status.includes(value)
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    <Button
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      编辑
                    </Button>
                    <Button
                      onClick={() => {
                        props.history.push({
                          pathname: "/educational/student",
                          query: record
                        });
                      }}
                    >
                      详情
                    </Button>
                  </span>
                );
              }
            }
          ]}
          data={raw}
        />
      </Container>
    </div>
  );
};
