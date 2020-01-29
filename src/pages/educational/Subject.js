import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { SubjectCard } from "../../components/Card";
import Pop from "../../components/Pop";
import { SubjectCreator } from "../../components/Form";
import { GET } from '../../lib/fetch';

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState([]);
  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    GET("/educational/subjects", { id: 1 }).then(res => {
      console.log(res);
      setRaw(res.data || []);
    });
  }, []);


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
        {
          raw.map(subject => <SubjectCard
            id={subject.id}
            name={subject.name}
            questionNum={subject.questionNum}
            chapterNum={subject.chapterNum}
            handleCourse={handleCourse}
            handleChapter={handleChapter}
          />)
        }

        {/* <SubjectCard name="毛概" questionNum={12} chapterNum={3} />
        <SubjectCard name="马原" questionNum={12} chapterNum={3} /> */}
      </Container>
    </div>
  );
};
