import React, { useState } from "react";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button } from "antd";
import Pop from "../../components/Pop";
import { ClassCreator } from "../../components/Form";

export default props => {
  const [visible, setVisible] = useState(false);
  const changePop = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
      >
        <ClassCreator />
      </Pop>
      <Header
        title="班级管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加班级",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "班级名称",
              dataIndex: "name"
            },
            {
              title: "人数",
              dataIndex: "count"
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
                          pathname: "/school/class",
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
        />
      </Container>
    </div>
  );
};
