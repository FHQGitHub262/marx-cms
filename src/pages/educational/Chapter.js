import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button } from "antd";
import Pop from "../../components/Pop";
import { ChapterCreator } from "../../components/Form";
import { GET } from "../../lib/fetch";
export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (props.location.query) {
      GET("/educational/chapters", { id: 1 }).then(res => {
        console.log(res);
        setRaw(res.data || []);
      });
    } else {
      props.history.push("/educational/subject");
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
