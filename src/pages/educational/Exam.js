import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button } from "antd";

export default props => {
  return (
    <div>
      <Header
        title="测验管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加测验",
          handler: () => {
            console.log("添加成功");
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
        />
      </Container>
    </div>
  );
};
