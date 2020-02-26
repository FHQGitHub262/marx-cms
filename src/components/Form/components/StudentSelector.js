import React from "react";
import { Tree } from "antd";

import "./StudentSelector.less";
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
    const api = [
      "/school/colleges",
      "/school/majors",
      "/school/classes",
      "/school/students"
    ];
    queryPayload.id = treeNode.props.eventKey;
    const { data } = await GET(api[stage], queryPayload);
    console.log(stage, stage === 3);
    return data.map(item => ({
      title: item.name,
      key: item.id || item.UserUuid,
      checkable: stage === 3,
      stage: stage + 1,
      isLeaf: stage === 3
    }));
  };

  constructor(props) {
    super(props);
    this.getData().then(data => {
      console.log(data);
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
        console.log(treeNode);
        this.setState({
          treeData: [...this.state.treeData]
        });
        resolve();
      });
    });

  onCheck = checkedKeys => {
    console.log("onCheck", checkedKeys, this.state.expandedKeys);

    this.setState(
      {
        checkedKeys,
        value: checkedKeys.filter(
          item => this.state.expandedKeys.indexOf(item) < 0
        )
      },
      () => {
        (this.props.onChange || (() => {}))(this.props.name, this.state.value);
      }
    );
  };

  onExpand = expandedKeys => {
    console.log("onExpand", expandedKeys);
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
            checkable={item.checkable || item.stage === 3}
          >
            {/* <TreeNode title={item.title} key={item.key} dataRef={item} > */}
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      // console.log("else");
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
