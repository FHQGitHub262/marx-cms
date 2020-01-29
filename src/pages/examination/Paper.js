import React, { useState, useEffect  } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Divider, Button } from "antd";
import Pop from "../../components/Pop";
import { PaperCreator } from "../../components/Form";
import { GET } from '../../lib/fetch';

export default props => {
  const [visible, setVisible] = useState(false);
  const [raw, setRaw] = useState(undefined);

  const changePop = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    GET("/examination/papers", { id: 1 }).then(res => {
      console.log(res);                             
      setRaw(res.data || []);
    });
  }, [props]);

  return (
    <div>
      <Pop
        visible={visible}
        doHide={() => {
          changePop();
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
            changePop();
          }
        }}
      />
      <Container>
        <SortTable
          columns={[
            {
              title: "名称",
              dataIndex: "name"
            },
            {
              title: "科目",
              dataIndex: "subject"
            },
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
