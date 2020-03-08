import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button, notification } from "antd";
import Pop from "../../components/Pop";
import { ClassCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const context = useContext(Context);
  const changePop = () => {
    setVisible(!visible);
  };

  const init = () => {
    GET("/school/classes", { id: props.location.query.id }).then(res => {
      console.log(res);
      setRaw(res.data || []);
    });
  };

  useEffect(() => {
    if (props.location.query && context.userInfo) {
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
              major: props.location.query.id
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
        <ClassCreator />
      </Pop>
      <Header
        title="班级管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加班级",
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
              title: "班级名称",
              dataIndex: "name"
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
                        props.history.push({
                          pathname: "/school/student",
                          query: record
                        });
                      }}
                    >
                      详情
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
