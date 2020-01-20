import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider } from "antd";

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
                    <a
                      href="#"
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      编辑
                    </a>
                    <Divider type="vertical" />
                    <a
                      href="#"
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      详情
                    </a>
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
