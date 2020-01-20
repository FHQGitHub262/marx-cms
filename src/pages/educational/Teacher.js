import React from "react";

import { Row, Divider } from "antd";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";

export default props => {
  return (
    <div>
      <Header
        title="教师管理"
        action={{
          name: "添加教师",
          handler: () => {
            console.log(props);
          }
        }}
      />
      <Container>
        <Row gutter={[24, 16]}>
          <SortTable
            columns={[
              {
                title: "工号",
                dataIndex: "id"
              },
              {
                title: "姓名",
                dataIndex: "name"
              },
              {
                title: "操作",
                render: (text, record) => (
                  <span>
                    <a
                      href="#"
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      重置密码
                    </a>
                    <Divider type="vertical" />
                    <a
                      href="#"
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      分配课程
                    </a>
                  </span>
                )
              }
            ]}
            actions={[
              {
                title: "提交",
                handler: selected => {
                  console.log(selected);
                }
              }
            ]}
          />
        </Row>
      </Container>
    </div>
  );
};
