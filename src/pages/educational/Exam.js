import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button, notification } from "antd";
import Pop from "../../components/Pop";
import { ExamCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    if (props.location.query) {
      GET("/educational/exams").then(res => {
        console.log(res);
        setRaw(res.data || []);
      });
    } else if (props.location.pathname === "/examination/quiz") {
      GET("/educational/exams").then(res => {
        console.log(res);
        setRaw(res.data || []);
      });
    } else {
      props.location.push("/");
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
        handleOk={() => {
          console.log(context.examCreator);
          if (beforeSubmit(context.examCreator)) {
            console.log(context.examCreator);
            POST("/educational/createExam", {
              ...context.examCreator.data
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
        <ExamCreator />
      </Pop>
      <Header
        title="测验管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加测验",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "考试名称",
              dataIndex: "name"
            },
            {
              title: "人数",
              dataIndex: "count"
            },
            {
              title: "考试时间",
              render: (text, record) =>
                `${new Date(record.startAt).toLocaleDateString()} ${new Date(
                  record.startAt
                ).toLocaleTimeString()}`
            },
            {
              title: "类型",
              dataIndex: "type",
              filters: [
                { text: "未开始", value: "before" },
                { text: "进行中", value: "active" },
                { text: "已结束", value: "end" }
              ],
              onFilter: (value, record) => record.name.includes(value)
            },
            {
              title: "状态",
              dataIndex: "status",
              filters: [
                { text: "未开始", value: "before" },
                { text: "进行中", value: "active" },
                { text: "已结束", value: "end" }
              ],
              onFilter: (value, record) => record.name.includes(value)
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
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        props.history.push({
                          pathname: "/educational/examinfo",
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
