import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button, notification } from "antd";
import Pop from "../../components/Pop";
import { QuestionImporter } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);

  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    GET("/educational/questions", { id: props.location.query.id }).then(res => {
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
        doHide={() => {
          changePop();
        }}
        handleOk={() => {
          if (beforeSubmit(context.questionImporter)) {
            // #TODO: 这个比较复杂，先不动
            POST("/educational/createCourse", {
              ...context.questionImporter.data,
              chapter: props.location.query.id
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
        <QuestionImporter />
      </Pop>
      <Header
        title="题目管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={
          (context.userInfo.privilege || []).indexOf("admin") >= 0
            ? {
                name: "添加题目",
                handler: () => {
                  changePop();
                }
              }
            : undefined
        }
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "题干",
              dataIndex: "title"
            },
            {
              title: "类型",
              render: (text, record) => {
                let value = "";
                switch (record.type) {
                  case "single":
                    return "单选题";
                  case "multi":
                    return "多选题";
                  case "trueFalse":
                    return "判断题";
                }
              },
              dataIndex: "type",
              filters: [
                { text: "单选题", value: "single" },
                { text: "多选题", value: "multi" },
                { text: "判断题", value: "trueFalse" }
              ],
              // filteredValue: filteredInfo.address || null,
              onFilter: (value, record) => record.type === value
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    {context.userInfo.privilege.indexOf("admin") >= 0 && (
                      <Button
                        onClick={() => {
                          console.log(record);
                        }}
                      >
                        编辑{context.userInfo.privilege.indexOf("admin")}
                      </Button>
                    )}
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
