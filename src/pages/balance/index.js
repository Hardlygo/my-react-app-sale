import React, { Component } from "react";
import { is, fromJS } from "immutable";

import API from "../../api/api";

//弹窗组件
import Alert from "../../components/alert";
//头部组件
import Header from "../../components/header";
//按钮组件
import TouchableOpacity from "../../components/TouchableOpacity";

import "./index.less";

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertTips: "", //弹窗文字
      alertStatus: false, //弹窗状态
      extractNum: "", //提现输入金额
      balance: {
        balance: 0,
      },
    };
  }

  componentDidMount() {
    this.getBalance();
  }
  //props、state改变了就渲染组件
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(nextProps), fromJS(this.props)) ||
      !is(fromJS(nextState), fromJS(this.state))
    );
  }
  render() {
    return (
      <div className="balance-container">
        <Header headerTitle="提现" record />
        <section className="balance-content">
          <p className="balance-content-title">
            您当前可提现金额为{this.state.balance.balance}
          </p>
          <form className="balance-content-form">
            <p>请输入提现金额（元）</p>
            <p>
              <span>￥</span>
              <input
                type="text"
                value={this.state.extractNum}
                onChange={this.handleInput}
                placeholder="0.00"
                maxLength="5"
              />
            </p>
          </form>
          <TouchableOpacity
            className="submit-btn"
            text="马上提现"
            clickCallBack={this.submitForm}
          />
        </section>
        <Alert
          alertContent={this.state.alertTips}
          alertStatus={this.state.alertStatus}
          onClose={() => {
            this.setState({
              alertStatus: false,
              alertTips: "",
            });
          }}
        />
      </div>
    );
  }

  getBalance = async () => {
    try {
      let result = await API.getBalance();
      console.log(result);
      this.setState({ balance: result });
    } catch (error) {}
  };
  /**
   * 格式化输入数据
   * 格式为微信红包格式：最大 200.00
   * @param  {object} event 事件对象
   */
  handleInput = (event) => {
    let value = event.target.value;
    if (/^\d*?\.?\d{0,2}?$/gi.test(value)) {
      if (/^0+[1-9]+/.test(value)) {
        value = value.replace(/^0+/, "");
      }
      if (/^0{2}\./.test(value)) {
        value = value.replace(/^0+/, "0");
      }
      value = value.replace(/^\./gi, "0.");
      if (parseFloat(value) > 200) {
        value = "200.00";
      }
      this.setState({ extractNum: value });
    }
  };

  submitForm = () => {
    let alertTips = "";
    let extractNum = this.state.extractNum;
    if (!this.state.extractNum) {
      alertTips = "请输入提现金额";
    } else if (
      parseFloat(this.state.extractNum) > parseFloat(this.state.balance.balance)
    ) {
      alertTips = "提现金额不能大于余额";
    } else {
      alertTips = "申请已成功提交";
      extractNum = "";
    }

    this.setState({
      alertStatus: true,
      alertTips,
      extractNum,
    });
  };
}
