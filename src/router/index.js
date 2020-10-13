import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
//高阶组件，异步引入组件
import asyncComponent from "../components/hoc/asyncComponent";

import Home from "../pages/home";
const Production = asyncComponent(() => import("../pages/production"));
const Record = asyncComponent(() => import("../pages/record"));
const Balance=asyncComponent(() => import("../pages/balance"));
const Help =asyncComponent(() => import("../pages/helpcenter"));

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
          <Route
            path="/production"
            render={(routeProps) => <Production {...routeProps} />}
          ></Route>
          <Route
            path="/record"
            render={(routeProps) => <Record {...routeProps} />}
          ></Route>
          <Route
            path="/balance"
            render={(routeProps) => <Balance {...routeProps} />}
          ></Route>
          <Route
            path="/helpcenter"
            render={(routeProps) => <Help {...routeProps} />}
          ></Route>
        </Switch>
      </HashRouter>
    );
  }
}
