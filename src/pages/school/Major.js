import React, { useState, useEffect } from "react";

import { Row } from "antd";

import { MajorCard } from "../../components/Card";
import Header from "../../components/Header";
import Container from "../../components/Container";
import Pop from "../../components/Pop";
import { MajorCreator } from "../../components/Form";
import { GET } from '../../lib/fetch';

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState([]);
  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (props.location.query) {
      GET("/school/majors", { id: 1 }).then(res => {
        console.log(res);
        setRaw(res.data || []);
      });
    } else {
      props.history.push("/school/college");
    }
  }, [props]);

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
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加专业",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <Row gutter={[24, 16]}>
          {
            raw.map(major => <MajorCard
              key={major.id}
              MajorName={major.name}
              classNum={major.classNum}
              handler={item => {
                props.history.push({
                  pathname: "/school/class",
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
