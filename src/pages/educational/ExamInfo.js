import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import DataShower from "../../components/DataShower";
import { DOWNLOAD, GET } from "../../lib/fetch";
import { decode } from "../../lib/params";

export default (props) => {
  const [statistics, setStatistics] = useState([]);
  const [record, setRecord] = useState([]);
  const [query] = useState(() => {
    return decode(props.location.search);
  });

  const init = () => {
    if (query) {
      GET("/educational/exam/galance", {
        id: query.id,
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
        title={(query || {}).name || ""}
        onBack={() => {
          props.history.goBack();
        }}
      />
      <Container>
        <DataShower
          data={[
            {
              title: "平均分",
              value: statistics.average || "",
            },
            {
              title: "最高分",
              value: statistics.max || "",
            },
            {
              title: "及格人数",
              value: statistics.pass || "",
            },
          ]}
        />
        <SortTable
          actions={[
            {
              title: "导出Excel文件",
              handler: () => {
                DOWNLOAD("/educational/exam/export", {
                  id: query.id,
                });
              },
            },
          ]}
          columns={[
            {
              title: "姓名",
              dataIndex: "name",
              search: "name",
            },
            {
              title: "学号",
              dataIndex: "idNumber",
              search: "idNumber",
            },
            {
              title: "学院",
              dataIndex: "college",
              search: "college",
            },
            {
              title: "专业",
              dataIndex: "major",
              search: "major",
            },
            {
              title: "班级",
              dataIndex: "class",
              search: "class",
            },
            {
              title: "分数",
              dataIndex: "grade",
              render: (text, record) => {
                return record.grade || 0;
              },
            },
          ]}
          data={record}
        />
      </Container>
    </div>
  );
};
