import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";

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
                    <a
                      href="#"
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      查看详情
                    </a>
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
