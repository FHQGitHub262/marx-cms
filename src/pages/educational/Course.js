import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button } from "antd";

export default props => {
  return (
    <div>
      <Header
        title="课程管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加课程",
          handler: () => {
            console.log("添加成功");
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
              onFilter: (value, record) => record.name.includes(value)
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    <Button
                      href="#"
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
        />
      </Container>
    </div>
  );
};
