import React from "react";

import { Row } from "antd";

import { CollegeCard } from "../../components/Card";
import Header from "../../components/Header";
import Container from "../../components/Container";

export default props => {
  return (
    <div>
      <Header
        title="学院一览"
        action={{
          name: "添加学院",
          handler: () => {
            console.log(props);
          }
        }}
      />
      <Container>
        <Row gutter={[24, 16]}>
          <CollegeCard collegeName="计算机学院" majorNum={12} classNum={10} />
        </Row>
      </Container>
    </div>
  );
};
