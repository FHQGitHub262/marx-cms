import React, { useState } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { SubjectCard } from "../../components/Card";
import Pop from "../../components/Pop";
import { SubjectCreator } from "../../components/Form";

export default props => {
  const [visible, setVisible] = useState(false);
  const changePop = () => {
    setVisible(!visible);
  };

  const handleCourse = item => {
    props.history.push({ pathname: "/educational/course", query: item });
  };
  const handleChapter = item => {
    props.history.push({ pathname: "/educational/chapter", query: item });
  };

  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
      >
        <SubjectCreator />
      </Pop>
      <Header
        title="学科管理"
        action={{
          name: "添加学科",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <SubjectCard
          id="1"
          name="马原"
          questionNum={12}
          chapterNum={3}
          handleCourse={handleCourse}
          handleChapter={handleChapter}
        />
        {/* <SubjectCard name="毛概" questionNum={12} chapterNum={3} />
        <SubjectCard name="马原" questionNum={12} chapterNum={3} /> */}
      </Container>
    </div>
  );
};
