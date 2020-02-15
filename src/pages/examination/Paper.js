import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button, notification } from "antd";
import Pop from "../../components/Pop";
import { PaperCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);

  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    GET("/examination/papers").then(res => {
      setRaw(res.data || []);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
        handleOk={() => {
          console.log(context.paperCreator);
          if (beforeSubmit(context.paperCreator)) {
            console.log(context.paperCreator);
            POST("/examination/createPaper", {
              ...context.paperCreator.data
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
      >
        <PaperCreator />
      </Pop>
      <Header
        title="试卷管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加试卷",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "名称",
              dataIndex: "name"
            },
            {
              title: "类型",
              render: (text, record) => (record.type ? "大考" : "小练习")
            },
            {
              title: "单选题数",
              dataIndex: "totalSingle"
            },
            {
              title: "多选题数",
              dataIndex: "totalMulti"
            },
            {
              title: "判断题数",
              dataIndex: "totalTrueFalse"
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
