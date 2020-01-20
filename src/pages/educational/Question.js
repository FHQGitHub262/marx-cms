import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button } from "antd";

export default props => {
  return (
    <div>
      <Header
        title="题目管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加题目",
          handler: () => {
            console.log("添加成功");
          }
        }}
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "题干",
              dataIndex: "name"
            },
            {
              title: "类型",
              dataIndex: "type"
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
                        console.log(record);
                      }}
                    >
                      详情
                    </Button>
                  </span>
                );
              }
            }
          ]}
          actions={[
            {
              title: "禁用",
              handler: v => {
                console.log(v);
              }
            }
          ]}
        />
      </Container>
    </div>
  );
};
