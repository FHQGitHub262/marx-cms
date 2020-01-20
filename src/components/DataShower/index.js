import React from "react";
import "./index.less";
import { Statistic, Row, Col } from "antd";

export default props =>
  props.data ? (
    <Row className="dataShower">
      {props.data.map((item, index) => (
        <Col xs={12} sm={6} md={3} key={index}>
          <Statistic value={item.value} title={item.title} />
        </Col>
      ))}
    </Row>
  ) : null;
