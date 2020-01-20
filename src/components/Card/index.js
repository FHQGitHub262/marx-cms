import React from "react";
import "./index.less";
import { Card, Col, Button } from "antd";

export const CollegeCard = props => {
  return (
    <Col xs={24} sm={12} md={6}>
      <Card
        title={props.collegeName || "College"}
        bordered={true}
        style={{ maxWidth: 300 }}
        actions={[
          <Button onClick={(props.handler || (() => {}))()}>查看</Button>
        ]}
      >
        {props.majorNum && <p>专业数：{props.majorNum}</p>}
        {props.classNum && <p>班级数：{props.classNum}</p>}
      </Card>
    </Col>
  );
};

export const MajorCard = props => {
  return (
    <Col xs={24} sm={12} md={6}>
      <Card
        title={props.majorName || "College"}
        bordered={true}
        style={{ maxWidth: 300 }}
        actions={[
          <Button onClick={(props.handler || (() => {}))()}>查看</Button>
        ]}
      >
        {props.classNum && <p>班级数：{props.classNum}</p>}
      </Card>
    </Col>
  );
};

export const SubjectCard = props => {
  return (
    <Col xs={24} sm={12} md={6}>
      <Card
        title={props.name || "Subject"}
        bordered={true}
        style={{ maxWidth: 300 }}
        actions={[
          <Button
            onClick={() => {
              const backUp = (...args) => {
                console.log(args);
              };
              (props.handleCourse || backUp)(props);
            }}
          >
            查看课程
          </Button>,
          <Button
            onClick={() => {
              const backUp = (...args) => {
                console.log(args);
              };
              (props.handleChapter || backUp)(props);
            }}
          >
            查看章节
          </Button>
        ]}
      >
        {props.chapterNum && <p>章节数：{props.chapterNum}</p>}
        {props.questionNum && <p>题目数：{props.questionNum}</p>}
      </Card>
    </Col>
  );
};
