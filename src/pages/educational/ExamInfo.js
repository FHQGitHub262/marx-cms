import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import DataShower from "../../components/DataShower";
import { DOWNLOAD, GET, POST } from "../../lib/fetch";
import { decode } from "../../lib/params";
import { Button, message } from "antd";

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
            }
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
            {
              title: "重新判卷",
              handler: async () => {
                message.info('开始判卷')
                await POST('/educational/exam/judge', {
                  id: query.id
                })
                message.info('判卷结束')
                await init()
              }
            }
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
            {
              title: "操作",
              dataIndex: "op",
              render: (text, record) => {
                return <Button onClick={
                  () => {
                    DOWNLOAD("/educational/exam/word", {
                      id: query.id,
                      userId: record.id
                    });
                  }
                }>下载试卷</Button>
              }
            }
          ]}
          data={record}
        />
      </Container>
    </div>
  );
};
