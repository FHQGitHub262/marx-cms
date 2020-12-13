import React, { useState, useEffect, useContext, useMemo } from "react";

import { Row, Button } from "antd";

import Context from "../../context";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { decode } from "../../lib/params";

import { GET } from "../../lib/fetch";

export default (props) => {
  // const [visible, setVisible] = useState(false);
  const context = useContext(Context);
  const [raw, setRaw] = useState(undefined);
  const query = useMemo(() => {
    return decode(props.location.search);
  }, [props]);

  const init = () => {
    GET("/school/students", { id: query.id }).then((res) => {
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
      <Header
        title="学生管理"
        onBack={() => {
          props.history.goBack();
        }}
        // action={{
        //   name: "添加学生",
        //   handler: () => {
        //     changePop();
        //   },
        // }}
      />
      <Container>
        <Row>
          <SortTable
            data={raw}
            columns={[
              {
                title: "学号",
                dataIndex: "idNumber",
              },
              {
                title: "姓名",
                dataIndex: "name",
              },
              {
                title: "操作",
                render: (text, record) => (
                  <span>
                    <Button
                      onClick={() => {
                        console.log(record);
                      }}
                    >
                      重置密码
                    </Button>
                  </span>
                ),
              },
            ]}
            actions={
              [
                // {
                //   title: "提交",
                //   handler: selected => {
                //     console.log(selected);
                //   }
                // }
              ]
            }
            keyName="UserUuid"
          />
        </Row>
      </Container>
    </div>
  );
};
