import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.less";

import { is, fromJS } from "immutable";

import TouchableOpacity from "../TouchableOpacity";
import { CSSTransition } from "react-transition-group";

export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  // 关闭弹框
  confirm = () => {
    this.props.onClose && this.props.onClose();
  };

  render() {
    return (
      <CSSTransition
        in={this.props.alertStatus}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <div className="alert">
          <div className="alert-wrraper">
            <div className="alert-content">{this.props.alertContent}</div>
            <TouchableOpacity
              className="confirm-btn"
              clickCallBack={this.confirm}
            />
          </div>
        </div>
      </CSSTransition>
    );
  }
}
Alert.propTypes = {
  onClose: PropTypes.func,
  alertContent: PropTypes.string.isRequired,
  alertStatus: PropTypes.bool.isRequired
};
