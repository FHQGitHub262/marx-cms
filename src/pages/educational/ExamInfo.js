import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import DataShower from "../../components/DataShower";
import { DOWNLOAD, GET, POST } from "../../lib/fetch";
import { notification } from "antd";

export default props => {
  const [statistics, setStatistics] = useState([]);
  const [record, setRecord] = useState([]);
  const init = () => {
    if (props.location.query) {
      console.log(props.location.query);
      GET("/educational/exam/galance", {
        id: props.location.query.id
      }).then(({ data }) => {
        setStatistics(data.statistics);
        setRecord(data.record || []);
      });
    } else {
      props.history.push("/");
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <Header
        title={(props.location.query || {}).name || ""}
        onBack={() => {
          props.history.goBack();
        }}
      />
      <Container>
        <DataShower
          data={[
            {
              title: "平均分",
              value: statistics.average || ""
            },
            {
              title: "最高分",
              value: statistics.max || ""
            },
            {
              title: "及格人数",
              value: statistics.pass || ""
            }
          ]}
        />
        <SortTable
          actions={[
            {
              title: "导出Excel文件",
              handler: () => {
                DOWNLOAD("/educational/exam/export", {
                  id: props.location.query.id
                });
              }
            },
            {
              title: "备卷",
              handler: () => {
                POST("/educational/exam/prepare", {
                  id: props.location.query.id
                }).then(({ success = false }) => {
                  success
                    ? notification.success({ message: "操作成功" })
                    : notification.error({ message: "操作失败" });
                });
              }
            }
          ]}
          columns={[
            {
              title: "姓名",
              dataIndex: "name"
            },
            {
              title: "学号",
              dataIndex: "idNumber"
            },
            {
              title: "分数",
              dataIndex: "grade"
            }
          ]}
          data={record}
        />
      </Container>
    </div>
  );
};
