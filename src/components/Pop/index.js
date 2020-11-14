import React from "react";
import { Modal } from "antd";

export default class Pop extends React.Component {
  state = {
    ModalText: "Content of the modal",
    confirmLoading: false,
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Modal
          style={{ ...this.props.style }}
          width={this.props.width || 520}
          destroyOnClose={this.props.destroyOnClose || false}
          title={this.props.title || "请填写表单"}
          visible={this.props.visible}
          onOk={this.props.handleOk || this.props.doHide}
          confirmLoading={this.props.loading || false}
          onCancel={this.props.doHide || this.handleCancel}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
