import React, { useState, useEffect } from "react";

import { Row, Button } from "antd";

import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import Pop from "../../components/Pop";
import { StudentImporter } from "../../components/Form";
import { GET } from "../../lib/fetch";

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (props.location.query) {
      // console.log("here");
      GET("/educational/students", { id: props.location.query.id }).then(
        res => {
          // console.log(res);
          setRaw(res.data || []);
        }
      );
    } else {
      props.history.push("/educational/subject");
    }
  }, [props]);
  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
        }}
      >
        <StudentImporter />
      </Pop>
      <Header
        title="学生管理"
        onBack={() => {
          props.history.goBack();
        }}
        action={{
          name: "添加学生",
          handler: () => {
            changePop();
          }
        }}
      />
      <Container>
        <Row>
          <SortTable
            keyName="UserUuid"
            data={raw}
            columns={[
              {
                title: "学号",
                dataIndex: "idNumber"
              },
              {
                title: "姓名",
                dataIndex: "name"
              }
              // {
              //   title: "操作",
              //   render: (text, record) => (
              //     <span>
              //       <Button
              //         href="#"
              //         onClick={() => {
              //           console.log(record);
              //         }}
              //       >
              //         重置密码
              //       </Button>
              //     </span>
              //   )
              // }
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
          />
        </Row>
      </Container>
    </div>
  );
};
