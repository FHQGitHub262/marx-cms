import React, { useState, useEffect, useContext, useMemo } from "react";
// import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button, notification, Divider } from "antd";
import Pop from "../../components/Pop";

import { GET, POST } from "../../lib/fetch";

import Detail from "../../components/Detail/Question";
import { decode } from "../../lib/params";
import { QuestionEdit } from "../../components/Form";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
  });
  const [detail, setDetail] = useState({});
  const context = useContext(Context);

  const query = useMemo(() => {
    return decode(props.location.search);
  }, [props]);

  const changePop = () => {
    setVisible(!visible);
  };

  const showDetail = (record) => {
    setDetail(record);
    setDetailVisible(true);
  };

  const editDetail = (record) => {
    context.update_questionEdit({
      ...record,
    });
    setEditVisible(true);
  };

  const init = () => {
    setLoading(true);
    GET("/educational/questions", {
      id: query.id,
      page: current,
    }).then((res) => {
      // console.log(res);
      setPagination({
        ...pagination,
        total: res.total,
      });
      setRaw(res.data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (decode(props.location.search) && context.userInfo) {
      init();
    } else {
      props.history.push("/educational/subject");
    }
  }, []);

  useEffect(() => {
    init();
  }, [current]);

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
        title="修改题目"
        visible={editVisible}
        doHide={() => setEditVisible(false)}
        handleOk={async () => {
          const res = await POST(
            "/educational/question/edit",
            context.questionEdit.data
          );
          if (res.success === true) {
            notification.success({ message: "修改成功" });
          } else {
            notification.warn({ message: "修改失败" });
          }
          init();
          setEditVisible(false);
        }}
      >
        <QuestionEdit />
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
              },
            }
            : undefined
        }

      />
      <Container>
        <SortTable
          search
          loading={loading}
          pagination={{ ...pagination, current }}
          loadData={(e) => {
            setCurrent(e);
          }}
          rowOptions={{
            getCheckboxProps: (record) => ({
              disabled: record.enable === false,
            }),
          }}
          columns={[
            {
              title: "题干",
              dataIndex: "title",
              search: "title",
              width: 400,
            },
            {
              title: "类型",
              render: (text, record) => {
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
                { text: "判断题", value: "trueFalse" },
              ],
              // filteredValue: filteredInfo.address || null,
              onFilter: (value, record) => record.type === value,
            },
            {
              title: "难度",
              dataIndex: "difficult",
              filters: [
                { text: "难", value: "难" },
                { text: "易", value: "易" },
                { text: "中", value: "中" },
              ],
              // filteredValue: filteredInfo.address || null,
              onFilter: (value, record) => String(record.difficult) === value,
            },
            {
              title: "状态",
              render: (text, record) => (record.enable ? "正常" : "禁用中"),
              dataIndex: "enable",
              filters: [
                { text: "正常", value: "true" },
                { text: "禁用中", value: "false" },
              ],
              // filteredValue: filteredInfo.address || null,
              onFilter: (value, record) => String(record.enable) === value,
            },
            {
              title: "使用场合",
              render: (text, record) => (record.usage ? "考试" : "课堂测验"),
              dataIndex: "usage",
              filters: [
                { text: "考试", value: "true" },
                { text: "课堂测验", value: "false" },
              ],
              // filteredValue: filteredInfo.address || null,
              onFilter: (value, record) => String(record.usage) === value,
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    <Button
                      onClick={() => {
                        editDetail(record);
                      }}
                    >
                      编辑
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        showDetail(record);
                      }}
                    >
                      详情
                    </Button>
                  </span>
                );
              },
            },
          ]}
          actions={[
            {
              title: "启用",
              handler: (v) => {
                POST("/educational/question/enable", {
                  range: v,
                }).then((res) => {
                  console.log(res);
                  init();
                });
              },
            },
            {
              title: "禁用",
              handler: (v) => {
                POST("/educational/question/disable", {
                  range: v,
                }).then((res) => {
                  init();
                });
              },
            },

            {
              title: "设置为考试题目",
              handler: (v) => {
                POST("/educational/question/unnormal", {
                  range: v,
                }).then((res) => {
                  init();
                });
              },
            },
            {
              title: "设置为课堂测验题目",
              handler: (v) => {
                POST("/educational/question/normal", {
                  range: v,
                }).then((res) => {
                  init();
                });
              },
            },
          ]}
          data={raw}
        />
      </Container>
    </div>
  );
};
