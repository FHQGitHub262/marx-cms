import React, { useState } from "react";

import { Row } from "antd";

import { MajorCard } from "../../components/Card";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Pop from "../../components/Pop";
import { MajorCreator } from "../../components/Form";

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
        <MajorCreator />
      </Pop>
      <Header
        title="专业一览"
        action={{
          name: "添加专业",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <Row gutter={[24, 16]}>
          <MajorCard
            MajorName="计算机学院"
            majorNum={12}
            classNum={10}
            handler={item => {
              props.history.push({
                pathname: "/school/class",
                query: item
              });
            }}
          />
        </Row>
      </Container>
    </div>
  );
};
