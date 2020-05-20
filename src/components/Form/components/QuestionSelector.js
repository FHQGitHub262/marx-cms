import React from "react";
import { Tree } from "antd";

import { GET } from "../../../lib/fetch";

const { TreeNode } = Tree;

export default class QuestionSelector extends React.Component {
  componentDidUpdate(props) {
    if (props.options.forExam !== this.state.forExam) {
      this.setState({
        treeData: [],
        checkedKeys: [],
        expandedKeys: [],
        value: [],
        loadedKeys: [],
        editType: false,
        forExam: props.options.forExam,
      });
      try {
        if (this.props.value.length > 0) {
          this.setState({
            editType: true,
          });
        }
      } catch (error) {
        console.log("error", error);
        this.setState({
          editType: false,
        });
      }
      this.getData().then((data) => {
        if (this.state.editType) {
          this.setState({
            treeData: [...data],
            expandedKeys: Array.from(
              new Set([
                ...this.state.expandedKeys,
                ...data
                  .filter((item) => item.isLeaf === false)
                  .map((item) => item.key),
              ])
            ),
          });
        }
        this.setState({
          treeData: [...data],
        });
      });
    }
  }

  componentDidMount() {
    try {
      if (this.props.value.length > 0) {
        this.setState({
          editType: true,
        });
      }
    } catch (error) {
      console.log("error", error);
      this.setState({
        editType: false,
      });
    }
    this.getData().then((data) => {
      if (this.state.editType) {
        this.setState({
          treeData: [...data],
          expandedKeys: Array.from(
            new Set([
              ...this.state.expandedKeys,
              ...data
                .filter((item) => item.isLeaf === false)
                .map((item) => item.key),
            ])
          ),
        });
      }
      this.setState({
        treeData: [...data],
      });
    });
  }
  getData = async (
    stage = 0,
    treeNode = {
      props: {},
    }
  ) => {
    let queryPayload = {};
    const api = [
      "/educational/subjects",
      "/educational/chapters",
      "/educational/questions",
    ];
    queryPayload.id = treeNode.props.eventKey;
    const { data } = await GET(api[stage], {
      ...queryPayload,
      ...this.props.options,
      forceEnabled: true,
    });
    return data.map((item) => ({
      title: item.title || item.name,
      key: item.id,
      checkable: stage === 2,
      stage: stage + 1,
      isLeaf: stage === 2,
    }));
  };

  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      checkedKeys: [],
      expandedKeys: [],
      value: [],
      editType: false,
      loadedKeys: [],
      forExam: props.options.forExam,
    };
  }

  onLoadData = async (treeNode) =>
    new Promise((resolve) => {
      console.log(treeNode);
      if (treeNode.props.children) {
        resolve();
      }

      this.getData(treeNode.props.stage, treeNode).then((children) => {
        treeNode.props.dataRef.children = children;
        if (this.state.editType) {
          const checkedAdds = [];
          children.forEach((item) => {
            const index = this.props.value.indexOf(item.key);
            if (index >= 0) checkedAdds.push(item.key);
          });

          this.setState({
            treeData: [...this.state.treeData],
            expandedKeys: Array.from(
              new Set([
                ...this.state.expandedKeys,
                ...children
                  .filter((item) => item.isLeaf === false)
                  .map((item) => item.key),
              ])
            ),
            checkedKeys: [...this.state.checkedKeys, ...checkedAdds],
          });
        } else {
          this.setState({
            treeData: [...this.state.treeData],
          });
        }

        resolve();
      });
    });

  onCheck = (checkedKeys) => {
    this.setState(
      {
        checkedKeys,
        value: checkedKeys.filter(
          (item) => this.state.expandedKeys.indexOf(item) < 0
        ),
      },
      () => {
        (this.props.onChange || (() => {}))(this.props.name, this.state.value);
      }
    );
  };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: true,
    });
  };

  onLoad = (loadedKeys) => {
    this.setState({
      loadedKeys: [...this.state.loadedKeys, loadedKeys],
    });
  };

  renderTreeNodes = (data) =>
    data.map((item) => {
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
          loadedKeys={this.state.loadedKeys}
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
