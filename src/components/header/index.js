import React, { Component } from "react";
import PropTypes from "prop-types";

import { is, fromJS } from "immutable";

import { NavLink } from "react-router-dom";

import { CSSTransition } from "react-transition-group";

import "./index.less";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navState: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  render() {
    return (
      <header className="header-container">
        <span
          className="header-slide-icon icon-catalog"
          onClick={this.toggleNav}
        ></span>
        <span className="header-title">{this.props.headerTitle}</span>
        {this.props.record && (
          <NavLink exact to="/record" className="header-link icon-jilu" />
        )}
        {this.props.confirm && (
          <NavLink exact to="/" className="header-link header-link-confirm">
            确定
          </NavLink>
        )}
        <CSSTransition
          in={this.state.navState}
          timeout={300}
          classNames="nav"
          unmountOnExit
        >
          <aside
            key="nav-slide"
            className="nav-slide-list"
            onClick={this.toggleNav}
          >
            <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">
              首页
            </NavLink>
            <NavLink
              to="/balance"
              exact
              className="nav-link icon-jiantou-copy-copy"
            >
              提现
            </NavLink>
            <NavLink
              to="/helpcenter"
              exact
              className="nav-link icon-jiantou-copy-copy"
            >
              帮助中心
            </NavLink>
          </aside>
        </CSSTransition>
      </header>
    );
  }

  toggleNav() {
    this.setState((state) => ({
      navState: !state.navState
    }));
  }
}
Header.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  record: PropTypes.any,
  confirm: PropTypes.any
};
