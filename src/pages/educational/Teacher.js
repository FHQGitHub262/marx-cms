import React, { useState, useEffect } from "react";
import { Row, Divider, Button } from "antd";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import Pop from "../../components/Pop";
import { TeacherCreator } from "../../components/Form";
import { GET } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const changePop = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    GET("/educational/teachers", { id: 1 }).then(res => {
      // console.log(res);
      setRaw(res.data || []);
    });
  }, []);

  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
      >
        <TeacherCreator />
      </Pop>
      <Header
        title="教师管理"
        action={{
          name: "添加教师",
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
                    <Divider type="vertical" />
                    <Button
                      href="#"
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      分配课程
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
            data={raw}
          />
        </Row>
      </Container>
    </div>
  );
};
