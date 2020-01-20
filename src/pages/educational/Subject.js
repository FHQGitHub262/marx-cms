import React from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { SubjectCard } from "../../components/Card";
export default props => {
  return (
    <div>
      <Header
        title="学科管理"
        action={{
          name: "添加学科",
          handler: () => {
            console.log(props);
          }
        }}
      />
      <Container>
        <SubjectCard name="马原" questionNum={12} chapterNum={3} />
        <SubjectCard name="毛概" questionNum={12} chapterNum={3} />
        <SubjectCard name="马原" questionNum={12} chapterNum={3} />
      </Container>
    </div>
  );
};
