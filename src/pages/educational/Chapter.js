import React, { useState, useEffect, useContext } from "react";
import beforeSubmit from "../../lib/beforeSubmit";
import Context from "../../context";
import Header from "../../components/Header";
import Container from "../../components/Container";
import SortTable from "../../components/SortTable";
import { Button, notification, message } from "antd";
import Pop from "../../components/Pop";
import SubjectSelect from "../../components/Subject";

import { QuestionImporter, ChapterCreator } from "../../components/Form";
import { GET, POST } from "../../lib/fetch";
import { decode, encode } from "../../lib/params";
import config from "../../config";
export default (props) => {
  const [visible, setVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [uploadLoading, setUploadloading] = useState(false);
  const [raw, setRaw] = useState(undefined);
  const [query, setQuery] = useState(() => {
    return decode(props.location.search);
  });

  const context = useContext(Context);

  const changePop = () => {
    setVisible(!visible);
  };

  const changeImportPop = () => {
    setImportVisible(!importVisible);
  };

  const init = () => {
    if (query === {}) {
      setRaw([]);
    } else {
      GET("/educational/chapters", { id: query.id }).then((res) => {
        console.log(res);
        setRaw(res.data || []);
      });
    }
  };
  // useEffect(() => {
  //   if (decode(props.location.search) && context.userInfo) {
  //     init();
  //   } else {
  //     props.history.push("/educational/subject");
  //   }
  // }, []);

  useEffect(() => {
    console.log("query", query);
    init();
  }, [query]);

  return (
    <div>
      <Pop
        visible={importVisible}
        doHide={() => {
          changeImportPop();
        }}
        loading={uploadLoading}
        handleOk={() => {
          if (beforeSubmit(context.questionImporter)) {
            // #TODO: 这个比较复杂，先不动
            console.log(query.id);
            setUploadloading(true);

            message.success("开始处理，请稍后");
            POST("/educational/questions/import", {
              filename: context.questionImporter.data.id,
              subject: query.id,
            })
              .then((res) => {
                notification.success({ message: "添加成功", duration: 2 });
                changeImportPop();
                setUploadloading(false);
                init();
              })
              .catch((e) => {
                setUploadloading(false);
                notification.error({
                  message: "添加出错",
                  duration: 2,
                });
              });
          }
        }}
      >
        <QuestionImporter />
      </Pop>
      <Pop
        visible={visible}
        handleOk={() => {
          console.log(query, context.chapterCreator);
          if (beforeSubmit(context.chapterCreator)) {
            POST("/educational/createChapter", {
              ...context.chapterCreator.data,
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
        doHide={() => {
          changePop();
        }}
      >
        <ChapterCreator />
      </Pop>
      <Header
        title="题库管理"
        onBack={() => {
          props.history.goBack();
        }}
        actions={
          [
            // <Button onClick={changePop} key="1">
            //   添加章节
            // </Button>,
            (context.userInfo.privilege || []).indexOf("admin") >= 0
            && (<Button
              onClick={changeImportPop}
              key="2"
              loading={uploadLoading}
              disabled={!(query !== undefined && query.id !== undefined)}
            >
              导入题库
            </Button>),
            <Button onClick={() => {

              const link = document.createElement('a');
              //设置下载的文件名
              link.download = `考试系统-题库模板.xlsx`;
              
              //设置下载路径
              link.target = '_blank'
              link.href = `${config.suffix}/demo/绪论.xlsx`;
              //触发点击
              link.click();
            }}>下载模板</Button>
          ]



        }
      />
      <Container>
        <SubjectSelect
          tips="当前选择的学科："
          placeholder="请选择要查看的学科"
          onChange={(e) => {
            setQuery(e);
          }}
        />
        <SortTable
          data={raw}
          columns={[
            {
              title: "章节名称",
              dataIndex: "name",
            },
            {
              title: "操作",
              render: (text, record) => {
                return (
                  <span>
                    <Button
                      onClick={() => {
                        props.history.push(
                          "/educational/question" + encode(record)
                        );
                        // console.log(record);
                      }}
                    >
                      查看详情
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
