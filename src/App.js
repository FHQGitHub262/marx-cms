import React, { useEffect, useState } from "react";
import "./App.less";
import { Layout, Menu, Icon, notification } from "antd";
import RouterView from "./router";
import routeConfig from "./router/config";
import { Link, useHistory } from "react-router-dom";
import { Login } from "./components/Form";
import Pop from "./components/Pop";
import { POST } from "./lib/fetch";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default props => {
  const [userInfo, setUserInfo] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const [logined, setLogined] = useState(true);
  const [active, setActive] = useState(window.location.pathname);
  const [history] = useState(useHistory());
  useEffect(() => {
    window.addEventListener("login", () => {
      setLogined(false);
    });

    POST("/user/info").then(res => {
      if ((res.success || false) === false) {
        window.dispatchEvent(new Event("login"));
      } else {
        console.log(res.data);
        window.dispatchEvent(
          new CustomEvent("userInfo", {
            detail: res.data
          })
        );
        setUserInfo(res.data);
      }
    });
  }, []);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const login = async () => {
    const { success = false, data = {} } = await POST("/user/login", {
      uuid: "zuoteng.jzt",
      password: "123456"
    });
    if (success) {
      setLogined(true);
      setUserInfo(data);
      notification.success({
        message: "登录成功",
        duration: 2
      });
    } else {
      notification.error({
        message: "登录失败",
        description: "请检查用户名和密码",
        duration: 2
      });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Pop
        visible={!logined || false}
        doHide={() => console.log("try hide")}
        handleOk={() => login()}
      >
        <Login />
      </Pop>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div
          className="logo"
          onClick={() => {
            console.log(history);
            history.push({
              pathname: "/",
              query: userInfo
            });
          }}
        />

        <Menu
          theme="dark"
          defaultOpenKeys={["test", "/school", "/examination", "/educational"]}
          defaultSelectedKeys={[active]}
          mode="inline"
        >
          {routeConfig.map(route => {
            if (!route.routes) {
              return (
                route.display === true && (
                  <Menu.Item key={route.path}>
                    <Link to={route.path}>
                      {route.icon && <Icon type={route.icon} />}
                      <span>{route.name}</span>
                    </Link>
                  </Menu.Item>
                )
              );
            } else {
              return (
                <SubMenu
                  key={route.path}
                  title={
                    <span>
                      {route.icon && <Icon type={route.icon} />}
                      <span>{route.name}</span>
                    </span>
                  }
                >
                  {route.routes.map(subRoutes => {
                    return (
                      subRoutes.display === true && (
                        <Menu.Item key={subRoutes.path}>
                          <Link to={subRoutes.path}>{subRoutes.name}</Link>
                        </Menu.Item>
                      )
                    );
                  })}
                </SubMenu>
              );
            }
          })}
        </Menu>
      </Sider>
      <Layout
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Header
          style={{
            flex: 0,
            background: "#fff",
            padding: 0,
            display: "flex",
            flexDirection: "row-reverse"
          }}
        >
          <div
            style={{
              position: "relative",
              right: "16px"
            }}
          >
            {userInfo.name || ""}
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", flex: 1 }}>
          <div
            style={{
              padding: 24,
              background: "#fff",
              height: "100%"
            }}
          >
            <RouterView />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", flex: 0 }}>
          Marx - 树人大学考试系统
        </Footer>
      </Layout>
    </Layout>
  );
};
