import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import DataShower from "../../components/DataShower";

export default props => {
  return (
    <div>
      <Header
        title="考试详情"
        onBack={() => {
          props.history.goBack();
        }}
      />
      <Container>
        <DataShower
          data={[
            {
              title: "平均分",
              value: 61
            },
            {
              title: "最高分",
              value: 99
            },
            {
              title: "及格人数",
              value: 30
            }
          ]}
        />
        <SortTable
          columns={[
            {
              title: "姓名",
              dataIndex: "name"
            },
            {
              title: "学号",
              dataIndex: "id"
            },
            {
              title: "分数",
              dataIndex: "grade"
            }
          ]}
        />
      </Container>
    </div>
  );
};
