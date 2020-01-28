import React, { useState } from "react";

import { Row } from "antd";

import { CollegeCard } from "../../components/Card";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Pop from "../../components/Pop";
import { CollegeCreator } from "../../components/Form";

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
        <CollegeCreator />
      </Pop>
      <Header
        title="学院一览"
        action={{
          name: "添加学院",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <Row gutter={[24, 16]}>
          <CollegeCard
            collegeName="计算机学院"
            majorNum={12}
            classNum={10}
            handler={item => {
              props.history.push({
                pathname: "/school/major",
                query: item
              });
            }}
          />
        </Row>
      </Container>
    </div>
  );
};
