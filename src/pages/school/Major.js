import React from "react";

import { Row } from "antd";

import { MajorCard } from "../../components/Card";
import Header from "../../components/Header";
import Container from "../../components/Container";

export default props => {
  return (
    <div>
      <Header
        title="专业一览"
        action={{
          name: "添加专业",
          handler: () => {
            console.log(props);
          }
        }}
      />
      <Container>
        <Row gutter={[24, 16]}>
          <MajorCard MajorName="计算机学院" majorNum={12} classNum={10} />
        </Row>
      </Container>
    </div>
  );
};
