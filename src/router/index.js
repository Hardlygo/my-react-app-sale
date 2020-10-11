import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
//高阶组件，异步引入组件
import asyncComponent from "../components/hoc/asyncComponent";

import Home from "../pages/home";

export default class Router extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(routeProps) => <Home {...routeProps} />}
          ></Route>
          <Redirect from="/home" to="/"></Redirect>
        </Switch>
      </HashRouter>
    );
  }
}
