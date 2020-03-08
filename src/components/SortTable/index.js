import React, { useState, useEffect } from "react";
import "./index.less";
import { Table, Button, Alert, Divider } from "antd";
import { Input, Icon } from "antd";
import Highlighter from "react-highlight-words";

export default props => {
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [loading, setLoading] = useState(!Boolean(props.data));
  const [search, setSearch] = useState({});

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

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`输入关键词`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          查找
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // console.log(visible);
        // setTimeout(() => search.searchInput.select());
      }
    },
    render: text =>
      search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearch({ searchText: "" });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }} className="actions">
        <div>
          {/* <Button
            type="primary"
            onClick={() => {
              setSelectedRowKeys([]);
            }}
            disabled={setSelectedRowKeys.length === 0}
            loading={loading}
          >
            清除选择
          </Button> */}
          {(props.actions || []).map((action, index) => (
            <span key={index}>
              <Button
                loading={loading}
                onClick={() => {
                  action.handler(selectedRowKeys);
                  setSelectedRowKeys([]);
                }}
              >
                {action.title}
              </Button>
              <Divider type="vertical" />
            </span>
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
        columns={(props.columns || []).map(item => {
          if (item.search) {
            return {
              ...item,
              ...getColumnSearchProps(item.search)
            };
          } else return item;
        })}
        dataSource={props.data || []}
        pagination={false}
        rowKey={record => record[props.keyName] || record.id}
      />
    </div>
  );
};
