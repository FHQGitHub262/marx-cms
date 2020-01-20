import React from "react";

import { Row, Button } from "antd";

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
                    <Button
                      href="#"
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      重置密码
                    </Button>
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
