import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button } from "antd";

export default props => {
  return (
    <div>
      <Header
        title="试卷管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加试卷",
          handler: () => {
            console.log("添加成功");
          }
        }}
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "名称",
              dataIndex: "name"
            },
            {
              title: "科目",
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
