import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button } from "antd";
import Pop from "../../components/Pop";
import { ExamCreator } from "../../components/Form";
import { GET } from "../../lib/fetch";
export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);

  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (props.location.query) {
      GET("/educational/exams", { id: 1 }).then(res => {
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
  }, []);
  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
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
              dataIndex: "startAt"
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
