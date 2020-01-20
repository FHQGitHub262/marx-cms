import React from "react";
import { Switch, Route } from "react-router-dom";
import config from "./config";

const renderRoutes = routesConfig => {
  return routesConfig.map(route => {
    if (!route.routes) {
      return <Route {...route} key={route.path} />;
    } else {
      const subRoutes = renderRoutes(route.routes);

      return [...subRoutes];
    }
  });
};

export default () => <Switch>{renderRoutes(config)}</Switch>;
