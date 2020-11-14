import React from "react";
// import { Tree } from "antd";

// import "./StudentSelector.less";
import { GET } from "../../../lib/fetch";

import { TreeSelect } from "antd";
const { TreeNode } = TreeSelect;

export default class Selector extends React.Component {
  state = {
    value: undefined,
    treeData: [
      { id: 1, pId: 0, value: "1", title: "Expand to load" },
      { id: 2, pId: 0, value: "2", title: "Expand to load" },
      { id: 3, pId: 0, value: "3", title: "Tree Node", isLeaf: true },
    ],
  };
  constructor(props) {
    super(props);
    this.tree = React.createRef();
    this.state = {
      treeData: [],
      checkedKeys: [],
      expandedKeys: [],
      value: [],
      editType: Object.keys(this.props.value).length > 0,
    };
  }
  componentDidMount() {
    this.tree.current.focus();
    try {
      if (Object.keys(this.props.value).length > 0) {
        console.log("here");
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
        console.log("here");
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
  onLoadData = async (treeNode) =>
    new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
      }
      this.getData(treeNode.props.stage, treeNode).then((children) => {
        treeNode.props.dataRef.children = children;
        if (this.state.editType) {
          console.log("here");
          const checkedAdds = [];
          children.forEach((item) => {
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
                  .filter((item) => item.isLeaf === false)
                  .map((item) => item.key),
              ])
            ),
            checkedKeys: [...this.state.checkedKeys, ...checkedAdds],
          });
        } else {
          console.log("there", this.state.editType);
          this.setState({
            treeData: [...this.state.treeData],
          });
        }

        resolve();
      });
    });

  getData = async (
    stage = 0,
    treeNode = {
      props: {},
    }
  ) => {
    let queryPayload = {};
    const api = [
      "/educational/subjects",
      "/educational/courses",
      // #TODO 改成educational的
      "/educational/students",
    ];
    queryPayload.id = treeNode.props.eventKey;
    const { data } = await GET(api[stage], queryPayload);
    return data.map((item) => ({
      title: item.name,
      key: stage === 2 ? item.UserUuid : item.id,
      checkable: stage === 2,
      stage: stage + 1,
      isLeaf: stage === 2,
    }));
  };

  onChange = (checkedKeys, label, extra) => {
    console.log(this.state.expandedKeys, checkedKeys, label, extra);
    const value = {
      students: checkedKeys.filter(
        (item) => this.state.expandedKeys.indexOf(item) < 0
      ),
      courses: this.state.expandedKeys,
      // courses: checkedKeys.filter(
      //   (item) => this.state.expandedKeys.indexOf(item) >= 0
      // ),
    };
    console.log("here", value);
    this.setState(
      {
        checkedKeys,
        value,
      },
      () => {
        (this.props.onChange || (() => {}))(this.props.name, this.state.value);
      }
    );
  };

  onExpand = (expandedKeys) => {
    console.log("here", expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            {...item}
            value={item.key || item.id}
            dataRef={item}
            label={item.key || item.id}
            checkable={item.checkable || item.stage === 2}
          >
            {/* <TreeNode title={item.title} key={item.key} dataRef={item} > */}
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          label={item.key}
          key={item.key}
          {...item}
          dataRef={item}
          value={item.key}
        />
      );
    });

  render() {
    return (
      <TreeSelect
        ref={this.tree}
        // treeDataSimpleMode
        showCheckedStrategy="SHOW_ALL"
        // value={this.state.display}
        maxTagCount={3}
        showSearch
        treeDefaultExpandAll={this.props.editType}
        treeCheckable
        treeNodeFilterProp="title"
        style={{ width: "100%" }}
        // value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="点击选择参与学生、班级"
        onChange={this.onChange}
        loadData={this.onLoadData}
        treeExpandedKeys={this.state.expandedKeys}
        value={this.state.checkedKeys}
        onTreeExpand={this.onExpand}
        // treeData={treeData}
      >
        {this.renderTreeNodes(this.state.treeData)}
      </TreeSelect>
    );
  }
}

// const { TreeNode } = Tree;

// export default class StudentSelector extends React.Component {
// componentDidMount() {
//   console.log(this.props.value);
//   try {
//     if (Object.keys(this.props.value).length > 0) {
//       this.setState({
//         editType: true
//       });
//     }
//   } catch (error) {
//     console.log("error", error);
//     this.setState({
//       editType: false
//     });
//   }
//   this.getData().then(data => {
//     if (this.state.editType) {
//       this.setState({
//         treeData: [...data],
//         expandedKeys: Array.from(
//           new Set([
//             ...this.state.expandedKeys,
//             ...data
//               .filter(item => item.isLeaf === false)
//               .map(item => item.key)
//           ])
//         )
//       });
//     }
//     this.setState({
//       treeData: [...data]
//     });
//   });
// }

// getData = async (
//   stage = 0,
//   treeNode = {
//     props: {}
//   }
// ) => {
//   let queryPayload = {};
//   const api = [
//     "/educational/subjects",
//     "/educational/courses",
//     // #TODO 改成educational的
//     "/educational/students"
//   ];
//   queryPayload.id = treeNode.props.eventKey;
//   const { data } = await GET(api[stage], queryPayload);
//   return data.map(item => ({
//     title: item.name,
//     key: stage === 2 ? item.UserUuid : item.id,
//     checkable: stage === 2,
//     stage: stage + 1,
//     isLeaf: stage === 2
//   }));
// };

//   constructor(props) {
//     super(props);
//     this.state = {
//       treeData: [],
//       checkedKeys: [],
//       expandedKeys: [],
//       value: [],
//       editType: false
//     };
//   }

// onLoadData = async (treeNode) =>
//   new Promise((resolve) => {
//     if (treeNode.props.children) {
//       resolve();
//     }
//     this.getData(treeNode.props.stage, treeNode).then((children) => {
//       treeNode.props.dataRef.children = children;
//       if (this.state.editType) {
//         const checkedAdds = [];
//         children.forEach((item) => {
//           const stuIndex = (this.props.value.students || []).indexOf(item.key);
//           const courseIndex = (this.props.value.courses || []).indexOf(
//             item.key
//           );
//           if (stuIndex >= 0 || courseIndex >= 0) checkedAdds.push(item.key);
//         });

//         this.setState({
//           treeData: [...this.state.treeData],
//           expandedKeys: Array.from(
//             new Set([
//               ...this.state.expandedKeys,
//               ...children
//                 .filter((item) => item.isLeaf === false)
//                 .map((item) => item.key),
//             ])
//           ),
//           checkedKeys: [...this.state.checkedKeys, ...checkedAdds],
//         });
//       } else {
//         this.setState({
//           treeData: [...this.state.treeData],
//         });
//       }

//       resolve();
//     });
//   });

//   onCheck = checkedKeys => {
//     this.setState(
//       {
//         checkedKeys,
//         value: {
//           students: checkedKeys.filter(
//             item => this.state.expandedKeys.indexOf(item) < 0
//           ),
//           courses: checkedKeys.filter(
//             item => this.state.expandedKeys.indexOf(item) >= 0
//           )
//         }
//       },
//       () => {
//         (this.props.onChange || (() => {}))(this.props.name, this.state.value);
//       }
//     );
//   };

//   onExpand = expandedKeys => {
//     this.setState({
//       expandedKeys,
//       autoExpandParent: false
//     });
//   };

//   renderTreeNodes = data =>
//     data.map(item => {
//       if (item.children) {
//         return (
//           <TreeNode
//             {...item}
//             dataRef={item}
//             checkable={item.checkable || item.stage === 2}
//           >
//             {/* <TreeNode title={item.title} key={item.key} dataRef={item} > */}
//             {this.renderTreeNodes(item.children)}
//           </TreeNode>
//         );
//       }
//       return <TreeNode key={item.key} {...item} dataRef={item} />;
//     });

//   render() {
//     return (
//       <div>
//         <Tree
//           checkable
//           treeDefaultExpandAll={this.props.editType}
//           disabled={this.props.disabled}
//           loadData={this.onLoadData}
//           onCheck={this.onCheck}
//           expandedKeys={this.state.expandedKeys}
//           checkedKeys={this.state.checkedKeys}
//           onExpand={this.onExpand}
//         >
//           {this.renderTreeNodes(this.state.treeData)}
//         </Tree>
//       </div>
//     );
//   }
// }
