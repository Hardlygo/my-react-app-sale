import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { is, fromJS } from "immutable";
//action
import { saveFormData, saveImg, clearData } from "../../store/home/action";
import { clearSelected } from "../../store/production/action";

//弹窗组件
import Alert from "../../components/alert";
//头部组件
import Header from "../../components/header";
//按钮组件
import TouchableOpacity from "../../components/TouchableOpacity";

import "./index.less";

class Home extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      alertStatus: false,
      alertTips: ""
    };
    //由props计算出来，不算state
    this.selectedProList = [];
    this.innitData = this.innitData.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  componentDidMount() {
    this.innitData(this.props);
  }
  //不再使用receiveProps生命周期函数
  componentDidUpdate(prevProps) {
    if (!is(fromJS(this.props.proData), fromJS(prevProps.proData))) {
      this.initData(this.props);
    }
  }
  render() {
    return (
      <main className="home-container">
        <Header headerTitle="首页" record />
        <div>
          <p>请录入您的信息</p>
          <form>
            <div>
              <span>销售金额：</span>
              <input type="text" placeholder="请输入订单金额" />
            </div>
            <div>
              <span>客户姓名：</span>
              <input type="text" placeholder="请输入客户姓名" />
            </div>
            <div>
              <span>客户电话：</span>
              <input type="text" placeholder="请输入客户电话" />
            </div>
          </form>
        </div>
        <div>
          <p>请选择销售的产品</p>
          <Link to="/production">
            {this.selectedProList.length ? (
              <ul>
                {this.selectedProList.map((item, index) => {
                  return (
                    <li key={index}>
                      {item.product_name}x{item.selectNum}
                    </li>
                  );
                })}
              </ul>
            ) : (
              "选择产品"
            )}
          </Link>
        </div>
        <div>
          <p>请上传发票凭证</p>
          <div>
            <span>上传图片</span>

            <input type="file" />
          </div>
          <img />
        </div>
        <TouchableOpacity text="提交" />
        <Alert
          alertContent={this.state.alertTips}
          alertStatus={this.state.alertStatus}
          onClose={() => {
            this.setState({
              alertStatus: false,
              alertTips: ""
            });
          }}
        />
      </main>
    );
  }
  innitData(props) {
    this.selectedProList = (props.proData.dataList || []).filter((item) => {
      return item.selectStatus && item.selectNum;
    });
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  //handleClick: ()=> dispatch(addNumber(1)),
});

Home.propTypes = {
  //state表单数据
  formData: PropTypes.object.isRequired,
  //产品数据
  proData: PropTypes.object.isRequired,
  //保存state表单数据
  saveFormData: PropTypes.fnc.isRequired,
  //保存图片
  saveImg: PropTypes.fnc.isRequired,
  //清除formdata
  clearData: PropTypes.fnc.isRequired,
  //清除选择产品
  clearSelected: PropTypes.fnc.isRequired,
  //对输入电话的加空格处理
  padStr: PropTypes.fnc.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
