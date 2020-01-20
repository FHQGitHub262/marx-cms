import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button } from "antd";

export default props => {
  return (
    <div>
      <Header
        title="章节管理"
        onBack={() => {
          props.history.goBack();
        }}
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "章节名称",
              dataIndex: "name"
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
                      查看详情
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
