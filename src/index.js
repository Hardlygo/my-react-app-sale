import React from "react";
import ReactDOM from "react-dom";

import Router from "./router";

import { Provider } from "react-redux";
import store from "./store/stroe";
import "./utils/rem";

import "./style/base.css";

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("root")
  );
};

render(Router);
