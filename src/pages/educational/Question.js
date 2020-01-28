import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button } from "antd";
import Pop from "../../components/Pop";
import { QuestionImporter } from "../../components/Form";
import { GET } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);

  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (props.location.query) {
      GET("/educational/questions", { id: 1 }).then(res => {
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
        <QuestionImporter />
      </Pop>
      <Header
        title="题目管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加题目",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "题干",
              dataIndex: "name"
            },
            {
              title: "类型",
              dataIndex: "type"
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    <Button
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      编辑
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      详情
                    </Button>
                  </span>
                );
              }
            }
          ]}
          actions={[
            {
              title: "禁用",
              handler: v => {
                console.log(v);
              }
            }
          ]}
          data={raw}
        />
      </Container>
    </div>
  );
};
