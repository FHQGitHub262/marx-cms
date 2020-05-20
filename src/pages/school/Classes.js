import React, { useState, useEffect, useContext, useMemo } from "react";
import beforeSubmit from "../../lib/beforeSubmit";

import Context from "../../context";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button, notification } from "antd";
import Pop from "../../components/Pop";
import { ClassCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import { decode, encode } from "../../lib/params";

export default (props) => {
  const [visible, setVisible] = useState(false);

  const [raw, setRaw] = useState(undefined);
  const context = useContext(Context);
  const query = useMemo(() => {
    return decode(props.location.search);
  }, [props]);

  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    GET("/school/classes", { id: query.id }).then((res) => {
      console.log(res);
      setRaw(res.data || []);
    });
  };

  useEffect(() => {
    if (decode(props.location.search) && context.userInfo) {
      init();
    } else {
      props.history.push("/school/college");
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
          if (beforeSubmit(context.classCreator)) {
            POST("/school/createClass", {
              ...context.classCreator.data,
              major: query.id,
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
        <ClassCreator />
      </Pop>
      <Header
        title="班级管理"
        onBack={() => {
          props.history.goBack();
        }}
        actions={[
          <Button onClick={changePop} key="0">
            手动添加班级
          </Button>,
        ]}
      />
      <Container>
        <SortTable
          data={raw}
          columns={[
            {
              title: "班级名称",
              dataIndex: "name",
            },
            // {
            //   title: "人数",
            //   dataIndex: "count"
            // },
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
                        props.history.push("/school/student" + encode(record));
                      }}
                    >
                      详情
                    </Button>
                  </span>
                );
              },
            },
          ]}
        />
      </Container>
    </div>
  );
};
