import React from "react";
import { Tree } from "antd";

import "./StudentSelector.less";
import { GET } from "../../../lib/fetch";

const { TreeNode } = Tree;

export default class StudentSelector extends React.Component {
  componentDidMount() {
    console.log(this.props.value);
    try {
      if (Object.keys(this.props.value).length > 0) {
        this.setState({
          editType: true
        });
      }
    } catch (error) {
      console.log("error", error);
      this.setState({
        editType: false
      });
    }
    this.getData().then(data => {
      if (this.state.editType) {
        this.setState({
          treeData: [...data],
          expandedKeys: Array.from(
            new Set([
              ...this.state.expandedKeys,
              ...data
                .filter(item => item.isLeaf === false)
                .map(item => item.key)
            ])
          )
        });
      }
      this.setState({
        treeData: [...data]
      });
    });
  }

  getData = async (
    stage = 0,
    treeNode = {
      props: {}
    }
  ) => {
    let queryPayload = {};
    const api = [
      "/educational/subjects",
      "/educational/courses",
      // #TODO 改成educational的
      "/educational/students"
    ];
    queryPayload.id = treeNode.props.eventKey;
    const { data } = await GET(api[stage], queryPayload);
    return data.map(item => ({
      title: item.name,
      key: stage === 2 ? item.UserUuid : item.id,
      checkable: stage === 2,
      stage: stage + 1,
      isLeaf: stage === 2
    }));
  };

  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      checkedKeys: [],
      expandedKeys: [],
      value: [],
      editType: false
    };
  }

  onLoadData = async treeNode =>
    new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
      }
      this.getData(treeNode.props.stage, treeNode).then(children => {
        treeNode.props.dataRef.children = children;
        if (this.state.editType) {
          const checkedAdds = [];
          children.forEach(item => {
            const stuIndex = (this.props.value.students || []).indexOf(
              item.key
            );
            const courseIndex = (this.props.value.courses || []).indexOf(
              item.key
            );
            if (stuIndex >= 0 || courseIndex >= 0) checkedAdds.push(item.key);
          });

          this.setState({
            treeData: [...this.state.treeData],
            expandedKeys: Array.from(
              new Set([
                ...this.state.expandedKeys,
                ...children
                  .filter(item => item.isLeaf === false)
                  .map(item => item.key)
              ])
            ),
            checkedKeys: [...this.state.checkedKeys, ...checkedAdds]
          });
        } else {
          this.setState({
            treeData: [...this.state.treeData]
          });
        }

        resolve();
      });
    });

  onCheck = checkedKeys => {
    this.setState(
      {
        checkedKeys,
        value: {
          students: checkedKeys.filter(
            item => this.state.expandedKeys.indexOf(item) < 0
          ),
          courses: checkedKeys.filter(
            item => this.state.expandedKeys.indexOf(item) >= 0
          )
        }
      },
      () => {
        (this.props.onChange || (() => {}))(this.props.name, this.state.value);
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
          treeDefaultExpandAll={this.props.editType}
          disabled={this.props.disabled}
          loadData={this.onLoadData}
          onCheck={this.onCheck}
          expandedKeys={this.state.expandedKeys}
          checkedKeys={this.state.checkedKeys}
          onExpand={this.onExpand}
        >
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
      </div>
    );
  }
}
