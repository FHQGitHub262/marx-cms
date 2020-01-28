import React, { useState, useEffect } from "react";
import "./index.less";
import { Table, Button, Alert } from "antd";

export default props => {
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [loading, setLoading] = useState(!Boolean(props.data));
  useEffect(() => {
    let timer;
    if (!props.data) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else {
      clearInterval(timer);
      setLoading(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [props.data]);
  return (
    <div>
      <div style={{ marginBottom: 16 }} className="actions">
        <div>
          <Button
            type="primary"
            onClick={() => {
              setSelectedRowKeys([]);
            }}
            disabled={setSelectedRowKeys.length === 0}
            loading={loading}
          >
            清除选择
          </Button>
          {(props.actions || []).map((action, index) => (
            <Button
              loading={loading}
              onClick={() =>
                action.handler(
                  selectedRowKeys.map(key =>
                    props.data.find(item => item.key === key)
                  )
                )
              }
              key={index}
            >
              {action.title}
            </Button>
          ))}
        </div>

        {selectedRowKeys.length > 0 && (
          <Alert
            style={{ marginTop: 16 }}
            message={`你已选择${selectedRowKeys.length}项`}
            type="info"
            className="selectedInfo"
          />
        )}
      </div>
      <Table
        loading={loading}
        rowSelection={{
          selectedRowKeys,
          onChange: nextSelected => {
            console.log("selectedRowKeys changed: ", nextSelected);
            setSelectedRowKeys(nextSelected);
          }
        }}
        columns={props.columns || []}
        dataSource={props.data || []}
        pagination={false}
        rowKey={record => record.id}
      />
    </div>
  );
};
