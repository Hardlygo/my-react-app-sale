import React, { Component } from "react";
import { is, fromJS } from "immutable";
//头部组件
import Header from "../../components/header";

import "./index.less";

export default class Help extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(nextProps), fromJS(this.props)) ||
      !is(fromJS(nextState), fromJS(this.state))
    );
  }
  render() {
    return (
      <div className="help-container">
        <Header headerTitle="关于" record />
          <p> code by Hardlygo</p>
          <p>my first react App using react redux react-router</p>
          <p>see in  <a href="https://github.com/Hardlygo/my-react-app-sale">github</a></p>
      </div>
    );
  }
}
