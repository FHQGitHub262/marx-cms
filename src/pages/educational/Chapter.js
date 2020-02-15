import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button, notification } from "antd";
import Pop from "../../components/Pop";
import { ChapterCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);

  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    GET("/educational/chapters", { id: props.location.query.id }).then(res => {
      console.log(res);
      setRaw(res.data || []);
    });
  };
  useEffect(() => {
    if (props.location.query && context.userInfo) {
      init();
    } else {
      props.history.push("/educational/subject");
    }
  }, []);

  return (
    <div>
      <Pop
        visible={visible}
        handleOk={() => {
          console.log(props.location.query, context.chapterCreator);
          if (beforeSubmit(context.chapterCreator)) {
            POST("/educational/createChapter", {
              ...context.chapterCreator.data,
              subject: props.location.query.id
            })
              .then(res => {
                notification.success({ message: "创建成功", duration: 2 });
                changePop();
                init();
              })
              .catch(e => {
                notification.error({
                  message: "创建出错",
                  duration: 2
                });
              });
          }
        }}
        doHide={() => {
          changePop();
        }}
      >
        <ChapterCreator />
      </Pop>
      <Header
        title="章节管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加章节",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <SortTable
          data={raw}
          columns={[
            {
              title: "章节名称",
              dataIndex: "name"
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    <Button
                      onClick={() => {
                        props.history.push({
                          pathname: "/educational/question",
                          query: record
                        });
                        // console.log(record);
                      }}
                    >
                      查看详情
                    </Button>
                  </span>
                );
              }
            }
          ]}
        />
      </Container>
    </div>
  );
};
