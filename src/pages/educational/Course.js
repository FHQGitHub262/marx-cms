import React, { useState, useEffect, useContext, useMemo } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button, notification, Divider } from "antd";
import Pop from "../../components/Pop";
import { CourseCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import { decode, encode } from "../../lib/params";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const [active, setActive] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const query = useMemo(() => {
    return decode(props.location.search);
  }, [props]);

  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  const openEdit = async (record) => {
    const { data } = await GET("/educational/course/detail", {
      id: record.id,
    });
    context.update_courseCreator({
      ...record,
      studentList: data.students,
      teacher: data.teacher[0],
    });

    setEditVisible(true);
  };

  const init = () => {
    GET("/educational/courses", { id: query.id }).then((res) => {
      setRaw(res.data || []);
    });
  };

  const endCourse = async (id) => {
    const { success = false } = await POST("/educational/course/end", {
      range: id,
    });
    init();
  };

  const fireCourse = async (id) => {
    const { success = false } = await POST("/educational/course/fire", {
      range: id,
    });
    init();
  };

  useEffect(() => {
    if (decode(props.location.search) && context.userInfo) {
      init();
    } else {
      props.history.push("/educational/subject");
    }
  }, []);

  return (
    <div>
      <Pop
        destroyOnClose
        visible={editVisible}
        doHide={() => {
          setEditVisible(false);
          context.update_courseCreator({});
        }}
        handleOk={() => {
          if (beforeSubmit(context.courseCreator)) {
            POST("/educational/updateCourse", {
              ...context.courseCreator.data,
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
          }
        }}
      >
        <CourseCreator />
      </Pop>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
        handleOk={() => {
          if (beforeSubmit(context.courseCreator)) {
            POST("/educational/createCourse", {
              ...context.courseCreator.data,
              subject: query.id,
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
        <CourseCreator />
      </Pop>
      <Header
        title="课程管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加课程",
          handler: () => {
            changePop();
          },
        }}
      />
      <Container>
        <SortTable
          actions={[
            {
              title: "批量结束",
              handler: (v) => {
                endCourse(v);
              },
            },
            {
              title: "批量激活",
              handler: (v) => {
                fireCourse(v);
              },
            },
          ]}
          columns={[
            {
              title: "课程名称",
              dataIndex: "name",
              search: "name",
            },
            // {
            //   title: "人数",
            //   dataIndex: "count"
            // },
            {
              title: "状态",
              dataIndex: "status",
              render: (text, record) => {
                switch (record.status) {
                  case "active":
                    return "进行中";
                  case "end":
                    return "已结束";
                }
              },
              filters: [
                { text: "进行中", value: "active" },
                { text: "已结束", value: "end" },
              ],
              onFilter: (value, record) => record.status.includes(value),
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    {record.status === "active" ? (
                      <Button
                        onClick={() => {
                          endCourse(record.id);
                        }}
                      >
                        结束课程
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          fireCourse(record.id);
                        }}
                      >
                        激活课程
                      </Button>
                    )}
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        props.history.push({
                          pathname: "/educational/student" + encode(record),
                        });
                      }}
                    >
                      详情
                    </Button>
                    <Divider type="vertical" />
                    <Button
                      onClick={() => {
                        console.log(record);
                        setActive(record.id);
                        openEdit(record);
                      }}
                    >
                      修改
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
