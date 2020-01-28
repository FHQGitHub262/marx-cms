import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button } from "antd";
import Pop from "../../components/Pop";
import { CourseCreator } from "../../components/Form";
import { GET } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (props.location.query) {
      console.log("here");
      GET("/educational/courses", { id: 1 }).then(res => {
        console.log(res);
        setRaw(res.data || []);
      });
    } else {
      props.history.push("/educational/subject");
    }
  }, [props]);

  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
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
            {
              title: "人数",
              dataIndex: "count"
            },
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
