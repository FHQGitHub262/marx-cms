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
import SubjectSelector from "../../components/Subject";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const [active, setActive] = useState("");
  const [subject, setSubject] = useState("");
  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    GET("/examination/papers", {
      id: subject.id || "",
    }).then((res) => {
      setRaw(res.data || []);
    });
  };

  const openEdit = async (record) => {
    const { data } = await GET("/examination/paper/detail", {
      id: record.id,
    });
    const nextState = {
      ...record,
      forExam: record.type,
      singleNum: record.totalSingle,
      multiNum: record.totalMulti,
      truefalseNum: record.totalTrueFalse,
      chapter: data.subject,
      singleList: (data.questions.single || []).map((item) => item.id),
      truefalseList: (data.questions.trueFalse || []).map((item) => item.id),
      multiList: (data.questions.multi || []).map((item) => item.id),
    }
    console.log(nextState)
    context.update_paperCreator(nextState);
    setEditVisible(true);
  };

  // useEffect(() => {
  //   init();
  // }, []);

  useEffect(() => {
    init();
  }, [subject]);

  return (
    <div>
      <Pop
        width={800}
        style={{ top: 10 }}
        visible={editVisible}
        doHide={() => {
          setEditVisible(false);
        }}
        handleOk={() => {
          if (beforeSubmit(context.paperCreator)) {
            console.log(context.paperCreator);
            POST("/examination/updatePaper", {
              ...context.paperCreator.data,
              id: active,
            })
              .then((res) => {
                notification.success({ message: "修改成功", duration: 2 });
                setEditVisible(false);
                context.update_paperCreator({});
                init();
              })
              .catch((e) => {
                notification.error({
                  message: "修改出错",
                  duration: 2,
                });
                context.update_paperCreator({});
              });
          }
        }}
      >
        <PaperCreator />
      </Pop>
      <Pop
        width={800}
        style={{ top: 10 }}
        visible={visible}
        doHide={() => {
          changePop();
        }}
        handleOk={() => {
          if (beforeSubmit(context.paperCreator)) {
            console.log(context.paperCreator);
            POST("/examination/createPaper", {
              ...context.paperCreator.data,
            })
              .then((res) => {
                notification.success({ message: "创建成功", duration: 2 });
                changePop();
                init();
              })
              .catch((e) => {
                notification.error({
                  message: "创建出错",
                  duration: 2,
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
            context.update_paperCreator({});
            changePop();
          },
          disabled: true,
        }}
      />
      <Container>
        <div style={{ display: "flex" }}>
          <SubjectSelector
            onChange={(e) => setSubject(e)}
            tips="当前选择的学科："
            placeholder="请选择要查看的学科"
          />
        </div>

        <SortTable
          columns={[
            {
              title: "名称",
              dataIndex: "name",
              search: "name",
            },
            {
              title: "类型",
              render: (text, record) => (record.type ? "大考" : "小练习"),
            },
            {
              title: "单选题数",
              dataIndex: "totalSingle",
            },
            {
              title: "多选题数",
              dataIndex: "totalMulti",
            },
            {
              title: "判断题数",
              dataIndex: "totalTrueFalse",
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    <Button
                      onClick={() => {
                        setActive(record.id);
                        openEdit(record);
                      }}
                    >
                      编辑
                    </Button>
                    {/* <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      详情
                    </Button> */}
                  </span>
                );
              },
            },
          ]}
          // actions={[
          //   {
          //     title: "禁用",
          //     handler: (v) => {
          //       console.log(v);
          //     },
          //   },
          // ]}
          data={raw}
        />
      </Container>
    </div>
  );
};
