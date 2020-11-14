import React from "react";
import { Login } from "../components/Form";
import logo from "../assets/logo.jpg";
import "./Login.less";
import { Button } from "antd";

export default (props) => {
  return (
    props.visible && (
      <div className="login-pop">
        <div className="login-container">
          <div className="side side-img"></div>
          <div className="side side-main">
            <div className="side-form" style={{ textAlign: "center" }}>
              <img src={logo} className="side-logo" alt="浙江树人大学" />
              <h1>思政课程网络考试系统</h1>
            </div>

            <div className="side-form">
              <Login></Login>
            </div>

            <div className="side-form">
              <Button
                style={{
                  width: "100%",
                }}
                onClick={props.handleLogin || (() => {})}
              >
                登录
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
