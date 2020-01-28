import React, { useState } from "react";

import { Row, Button } from "antd";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import Pop from "../../components/Pop";
import { StudentImporter } from "../../components/Form";

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
        <StudentImporter />
      </Pop>
      <Header
        title="学生管理"
        action={{
          name: "添加学生",
          handler: () => {
            changePop();
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
