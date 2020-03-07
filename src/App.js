import React, { useEffect, useState, useContext } from "react";
import "./App.less";

import Context from "./context";

import { Layout, Menu, Icon, notification, Popconfirm } from "antd";

import RouterView from "./router";
import routeConfig from "./router/config";

import { Link, useHistory } from "react-router-dom";

import { Login } from "./components/Form";
import Pop from "./components/Pop";

import { POST } from "./lib/fetch";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default props => {
  const context = useContext(Context);
  const { loginform, userInfo, setUserInfo } = context;
  const [collapsed, setCollapsed] = useState(false);
  const [logined, setLogined] = useState(true);
  const [active] = useState(window.location.pathname);
  const [history] = useState(useHistory());
  useEffect(() => {
    window.addEventListener("login", () => {
      setLogined(false);
    });

    POST("/user/info")
      .then(res => {
        if ((res.success || false) === false) {
          window.dispatchEvent(new Event("login"));
        } else {
          res.data.privilege = JSON.parse(res.data.privilege);
          setUserInfo(res.data);
        }
      })
      .catch(e => {
        notification.error({
          message: `获取用户信息失败` + JSON.stringify(e),
          duration: 2
        });
        window.dispatchEvent(new Event("login"));
      });
  }, []);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const login = async () => {
    try {
      const { success = false, data = {} } = await POST("/user/login", {
        uuid: loginform.data.id,
        password: loginform.data.password
      });

      if (success) {
        data.privilege = JSON.parse(data.privilege);
        setUserInfo(data);
        notification.success({
          message: "登录成功",
          duration: 2
        });
        setLogined(true);
      } else {
        notification.error({
          message: "登录失败",
          description: "请检查用户名和密码",
          duration: 2
        });
      }
    } catch (e) {
      notification.success({
        message: JSON.stringify(e),
        duration: 2
      });
    }
  };

  const logout = async () => {
    await POST("/user/logout");
    setUserInfo({});
    setLogined(false);
    history.push({
      pathname: "/",
      query: userInfo
    });
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
                route.display === true &&
                (route.admin !== true ||
                  (userInfo.privilege &&
                    userInfo.privilege.indexOf("admin") > 0)) && (
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
                (route.admin !== true ||
                  (userInfo.privilege &&
                    userInfo.privilege.indexOf("admin") >= 0)) && (
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
                        subRoutes.display === true &&
                        (subRoutes.admin !== true ||
                          (userInfo.privilege &&
                            userInfo.privilege.indexOf("admin") >= 0)) && (
                          <Menu.Item key={subRoutes.path}>
                            <Link to={subRoutes.path}>{subRoutes.name}</Link>
                          </Menu.Item>
                        )
                      );
                    })}
                  </SubMenu>
                )
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
            background: "var(--background-color)",
            padding: 0,
            color: "var(--font-color)",
            display: "flex",
            flexDirection: "row-reverse"
          }}
        >
          <div
            style={{
              position: "relative",
              right: "16px",
              cursor: "pointer"
            }}
          >
            <Popconfirm
              placement="bottom"
              title="确认要注销当前用户吗"
              okText="是"
              cancelText="否"
              onConfirm={logout}
            >
              {userInfo.name || ""}
            </Popconfirm>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", flex: 1 }}>
          <div
            style={{
              padding: 24,
              background: "var(--background-color-top)",
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
