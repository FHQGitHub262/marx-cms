import React from "react";
import { Modal } from "antd";

export default class Pop extends React.Component {
  state = {
    ModalText: "Content of the modal",
    confirmLoading: false
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  render() {
    const { confirmLoading } = this.state;
    return (
      <div>
        <Modal
          title="请填写表单"
          visible={this.props.visible}
          onOk={this.props.handleOk || this.props.doHide}
          confirmLoading={confirmLoading}
          onCancel={this.props.doHide || this.handleCancel}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
