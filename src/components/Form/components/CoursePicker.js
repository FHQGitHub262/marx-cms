import React from "react";
import { Tree } from "antd";

import { GET } from "../../../lib/fetch";

const { TreeNode } = Tree;

export default class StudentSelector extends React.Component {
  state = {
    treeData: [],
    checkedKeys: [],
    value: []
  };

  getData = async (
    stage = 0,
    treeNode = {
      props: {}
    }
  ) => {
    let queryPayload = {};
    const api = ["/educational/subjects", "/educational/courses"];
    queryPayload.id = treeNode.props.eventKey;
    const { data } = await GET(api[stage], queryPayload);
    return data.map(item => ({
      title: item.name,
      key: stage === 2 ? item.UserUuid : item.id,
      checkable: stage === 1,
      stage: stage + 1,
      isLeaf: stage === 1
    }));
  };

  constructor(props) {
    super(props);
    this.getData().then(data => {
      this.setState({
        treeData: [...data]
      });
    });
  }

  onLoadData = async treeNode =>
    new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      this.getData(treeNode.props.stage, treeNode).then(children => {
        treeNode.props.dataRef.children = children;
        this.setState({
          treeData: [...this.state.treeData]
        });
        resolve();
      });
    });

  onCheck = checkedKeys => {
    this.setState(
      {
        checkedKeys
      },
      () => {
        (this.props.onChange || (() => {}))(this.props.name, checkedKeys);
      }
    );
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            {...item}
            dataRef={item}
            checkable={item.checkable || item.stage === 2}
          >
            {/* <TreeNode title={item.title} key={item.key} dataRef={item} > */}
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    });

  render() {
    return (
      <div>
        <Tree
          checkable
          loadData={this.onLoadData}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onExpand={this.onExpand}
        >
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
      </div>
    );
  }
}
