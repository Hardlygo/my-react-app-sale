import React, { Component } from "react";

import PropTypes from "prop-types";

import { is, fromJS } from "immutable";

export default class TouchableOpacity extends Component {
  constructor(props) {
    super(props);
    this.btn = null;
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
  }
  onTouchStart() {
    this.btn.style.opacity = "0.3";
  }
  onTouchEnd() {
    this.btn.style.opacity = "1";
    this.props.clickCallBack();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  render() {
    return (
      <div
        className={`btn-con ${this.props.className}`}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        ref={(ref) => (this.btn = ref)}
      >
        {this.props.text || "确认"}
      </div>
    );
  }
}
TouchableOpacity.propTypes = {
  text: PropTypes.string,
  clickCallBack: PropTypes.func,
  className: PropTypes.string
};
