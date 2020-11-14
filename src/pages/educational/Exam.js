import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button, notification } from "antd";
// import Highlighter from "react-highlight-words";
import Pop from "../../components/Pop";
import { ExamCreator } from "../../components/Form";
import { GET, POST, DOWNLOAD } from "../../lib/fetch";
import dateFormat from "../../lib/dateFormat";
import SubjectSelector from "../../components/Subject";
import TimeRange from "../../components/TimeRange";
import { encode } from "../../lib/params";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const context = useContext(Context);
  const [active, setActive] = useState("");
  const [subject, setSubject] = useState("");
  const [range, setRange] = useState([]);
  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    if (props.location.query) {
      GET("/educational/exams", {
        id: subject.id || "",
        range: JSON.stringify(range),
      }).then((res) => {
        if (res.data !== undefined) {
          res.data = res.data.map((item) => {
            item.usageName = item.usage ? "大考" : "小考";
            return item;
          });
        }

        setRaw(res.data || []);
      });
    } else if (props.location.pathname === "/examination/quiz") {
      GET("/educational/exams", {
        id: subject.id || "",
        range: JSON.stringify(range),
      }).then((res) => {
        if (res.data !== undefined) {
          res.data = res.data.map((item) => {
            item.usageName = item.usage ? "大考" : "小考";
            return item;
          });
        }
        setRaw(res.data || []);
      });
    } else {
      props.location.push("/");
    }
  };

  const openEdit = async (record) => {
    const { data } = await GET("/educational/exam/detail", {
      id: record.id,
    });
    context.update_examCreator({
      ...record,
      paperId: record.PaperId,
      startAt: dateFormat(new Date(record.startAt), "yyyy-MM-dd hh:mm:ss"),
      endAt: dateFormat(new Date(record.endAt), "yyyy-MM-dd hh:mm:ss"),
      range: data,
    });

    setEditVisible(true);
  };

  // useEffect(() => {
  //   init();
  // }, []);

  useEffect(() => {
    init();
  }, [subject, range]);

  return (
    <div>
      <Pop
        destroyOnClose
        visible={editVisible}
        doHide={() => {
          setEditVisible(false);
          context.update_examCreator({});
        }}
        handleOk={() => {
          if (beforeSubmit(context.examCreator)) {
            POST("/educational/updateExam", {
              ...context.examCreator.data,
              id: active,
            })
              .then((res) => {
                notification.success({ message: "修改成功", duration: 2 });
                setEditVisible(false);
                init();
              })
              .catch((e) => {
                notification.error({
                  message: "修改出错",
                  duration: 2,
                });
              });
          } else {
            console.log("else");
          }
        }}
      >
        <ExamCreator />
      </Pop>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
        handleOk={() => {
          if (beforeSubmit(context.examCreator)) {
            POST("/educational/createExam", {
              ...context.examCreator.data,
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
        <ExamCreator />
      </Pop>
      <Header
        title="测验管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加测验",
          handler: () => {
            changePop();
          },
          disabled: subject && subject.id !== undefined,
        }}
      />
      <Container>
        <div style={{ display: "flex" }}>
          <SubjectSelector
            onChange={(e) => setSubject(e)}
            tips="当前选择的学科："
            placeholder="请选择要查看的学科"
          />
          <TimeRange onChange={(e) => setRange(e)} />
        </div>
        <SortTable
          actions={[
            {
              title: "批量导出成绩",
              handler: (v) => {
                // endCourse(v);
                console.log(v);
                DOWNLOAD("/educational/exam/batchexport", {
                  id: v,
                });
              },
            },
          ]}
          columns={[
            {
              title: "考试名称",
              dataIndex: "name",
              search: "name",
            },
            // {
            //   title: "人数",
            //   dataIndex: "count"
            // },
            {
              title: "开始时间",
              render: (text, record) =>
                `${new Date(record.startAt).toLocaleDateString()} ${new Date(
                  record.startAt
                ).toLocaleTimeString()}`,
            },
            {
              title: "结束时间",
              render: (text, record) =>
                `${new Date(record.endAt).toLocaleDateString()} ${new Date(
                  record.endAt
                ).toLocaleTimeString()}`,
            },
            {
              title: "类型",
              dataIndex: "usageName",
              filters: [
                { text: "大考", value: "TRUE" },
                { text: "小考", value: "FALSE" },
              ],
              onFilter: (value, record) => {
                return String(record.usage).toUpperCase() === value;
              },
            },
            // {
            //   title: "状态",
            //   dataIndex: "status",
            //   filters: [
            //     { text: "未开始", value: "before" },
            //     { text: "进行中", value: "active" },
            //     { text: "已结束", value: "end" }
            //   ],
            //   onFilter: (value, record) => record.name.includes(value)
            // },
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
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        props.history.push(
                          "/educational/examinfo" + encode(record)
                        );
                      }}
                    >
                      详情
                    </Button>
                  </span>
                );
              },
            },
          ]}
          data={raw}
        />
      </Container>
    </div>
  );
};
