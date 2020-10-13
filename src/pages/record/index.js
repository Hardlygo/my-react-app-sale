import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { is, fromJS } from "immutable";

//css
import "./index.less";

//头部组件
import Header from "../../components/header";

//子组件
import RecordList from "./components/record-list";
export default class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flagBarPos: "17%",
    };
  }
  componentDidMount() {
    // 初始化设置头部底部标签位置
    let type = this.props.location.pathname.split("/")[2];
    this.setFlagBarPos(type);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  //不再使用receiveProps生命周期函数
  componentDidUpdate(prevProps) {
    // 属性变化时设置头部底部标签位置
    let currenType = this.props.location.pathname.split("/")[2];
    let type = prevProps.location.pathname.split("/")[2];
    if (currenType !== type) {
      this.setFlagBarPos(currenType);
    }
  }
  render() {
    return (
      <div className="record-container">
        <Header headerTitle="记录" />
        <section className="record-nav-con">
          <nav className="record-nav">
            <NavLink
              className="nav-link"
              to={`${this.props.match.path}/passed`}
            >
              已通过
            </NavLink>
            <NavLink
              className="nav-link"
              to={`${this.props.match.path}/audited`}
            >
              待审核
            </NavLink>
            <NavLink
              className="nav-link"
              to={`${this.props.match.path}/failed`}
            >
              未通过
            </NavLink>
          </nav>
          <i
            className="nav-flag-bar"
            style={{ left: this.state.flagBarPos }}
          ></i>
        </section>
        {/* 子路由在父级配置，react-router4新特性，更加灵活 */}
        <Switch>
          <Route
            path={`${this.props.match.path}/:type`}
            render={(routeProps) => <RecordList {...routeProps} />}
          />

          <Redirect
            exact
            from={`${this.props.match.path}`}
            to={`${this.props.match.path}/passed`}
          />
        </Switch>
      </div>
    );
  }

  /**
   * 设置头部底部标签位置
   * @param  {string} type 数据类型
   */
  setFlagBarPos = (type) => {
    let flagBarPos;
    switch (type) {
      case "passed":
        flagBarPos = "17%";
        break;
      case "audited":
        flagBarPos = "50%";
        break;
      case "failed":
        flagBarPos = "83%";
        break;
      default:
        flagBarPos = "17%";
    }
    this.setState({ flagBarPos });
  };
}
