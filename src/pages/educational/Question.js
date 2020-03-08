import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button, notification } from "antd";
import Pop from "../../components/Pop";
import { QuestionImporter } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";

import Detail from "../../components/Detail/Question";

export default props => {
  const [visible, setVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const [detail, setDetail] = useState({});
  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  const showDetail = record => {
    console.log(record);
    setDetail(record);
    setDetailVisible(true);
  };

  const init = () => {
    GET("/educational/questions", {
      id: props.location.query.id
    }).then(res => {
      // console.log(res);
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
        title="题目详情"
        visible={detailVisible}
        doHide={() => {
          setDetailVisible(false);
        }}
      >
        <Detail {...detail} />
      </Pop>
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
          search
          columns={[
            {
              title: "题干",
              dataIndex: "title",
              search: "title"
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
              title: "类型",
              render: (text, record) => (record.enable ? "正常" : "禁用中"),
              dataIndex: "enable",
              filters: [
                { text: "正常", value: "true" },
                { text: "禁用中", value: "false" }
              ],
              // filteredValue: filteredInfo.address || null,
              onFilter: (value, record) => String(record.enable) === value
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    {/* {context.userInfo.privilege.indexOf("admin") >= 0 && (
                      <Button
                        onClick={() => {
                          console.log(record);
                        }}
                      >
                        编辑
                      </Button>
                    )}
                    <Divider type="vertical" /> */}
                    <Button
                      onClick={() => {
                        showDetail(record);
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
              title: "启用",
              handler: v => {
                POST("/educational/question/enable", {
                  range: v
                }).then(res => {
                  console.log(res);
                  init();
                });
              }
            },
            {
              title: "禁用",
              handler: v => {
                POST("/educational/question/disable", {
                  range: v
                }).then(res => {
                  console.log(res);
                  init();
                });
              }
            }
          ]}
          data={raw}
        />
      </Container>
    </div>
  );
};
