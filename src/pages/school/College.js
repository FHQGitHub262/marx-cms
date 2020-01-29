import React, { useState, useEffect } from "react";

import { Row } from "antd";

import { CollegeCard } from "../../components/Card";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Pop from "../../components/Pop";
import { CollegeCreator } from "../../components/Form";
import { GET } from '../../lib/fetch';

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState([]);
  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    GET("/school/colleges", { id: 1 }).then(res => {
      console.log(res);
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
          {
            raw.map(college => <CollegeCard
              key={college.id}
              collegeName={college.name}
              majorNum={college.majorNum}
              classNum={college.classNum}
              handler={item => {
                props.history.push({
                  pathname: "/school/major",
                  query: item
                });
              }}
            />)
          }
        </Row>
      </Container>
    </div>
  );
};
