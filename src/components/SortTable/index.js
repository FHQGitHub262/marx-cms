import React, { useState } from "react";
import "./index.less";
import { Table, Button, Alert } from "antd";

// TODO: 接入数据请求功能

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park"
  }
];

export default props => {
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [loading, setLoading] = useState(false);
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
                    data.find(item => item.key === key)
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
        rowSelection={{
          selectedRowKeys,
          onChange: nextSelected => {
            console.log("selectedRowKeys changed: ", nextSelected);
            setSelectedRowKeys(nextSelected);
          }
        }}
        columns={props.columns || []}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};
