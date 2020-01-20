import React from "react";
import "./App.less";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import RouterView from "./router";
import routeConfig from "./router/config";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      active: window.location.pathname
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultOpenKeys={["/school", "/examination", "/educational"]}
            defaultSelectedKeys={[this.state.active]}
            mode="inline"
          >
            {routeConfig.map(route => {
              if (!route.routes) {
                return (
                  <Menu.Item key={route.path}>
                    <Link to={route.path}>
                      {route.icon && <Icon type={route.icon} />}
                      <span>{route.name}</span>
                    </Link>
                  </Menu.Item>
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
                        <Menu.Item key={subRoutes.path}>
                          <Link to={subRoutes.path}>{subRoutes.name}</Link>
                        </Menu.Item>
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
              zuoteng.jzt
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
  }
}

export default App;
