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

import withPadStr from "../../components/hoc/withPadStr";

import "./index.less";
/**
 * @problem 认识到每次切换路由都会重现渲染组件，而不是走update流程
 * 不在state内的属性，当重新赋值时不会触发重新渲染
 */
class Home extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      alertStatus: false,
      alertTips: "",
      selectedProList:[]
    };
    //由props计算出来，不算state(不放入state不行)
    // this.selectedProList = [];
    this.innitData = this.innitData.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.upLoadImg = this.upLoadImg.bind(this);
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
  componentWillUnmount(){
    
  }
  //不再使用receiveProps生命周期函数
  componentDidUpdate(prevProps) {
    // 
    if (!is(fromJS(this.props.proData), fromJS(prevProps.proData))) {
      this.initData(this.props);
    }
  }
  render() {
    return (
      <main className="home-container">
        <Header headerTitle="首页" record />
        <div>
          <p className="common-title">请录入您的信息</p>
          <form className="home-form">
            <div className="home-form-item">
              <span>销售金额：</span>
              <input
                type="text"
                placeholder="请输入订单金额"
                value={this.props.formData.orderSum}
                onChange={(e) => this.handleInput("orderSum", e)}
              />
            </div>
            <div className="home-form-item">
              <span>客户姓名：</span>
              <input
                type="text"
                placeholder="请输入客户姓名"
                value={this.props.formData.name}
                onChange={(e) => this.handleInput("name", e)}
              />
            </div>
            <div className="home-form-item">
              <span>客户电话：</span>
              <input
                type="text"
                placeholder="请输入客户电话"
                maxLength="13"
                value={this.props.formData.phoneNo}
                onChange={(e) => this.handleInput("phoneNo", e)}
              />
            </div>
          </form>
        </div>
        <div>
          <p className="common-title">请选择销售的产品</p>
          <Link to="/production" className="common-select-btn">
            {this.state.selectedProList.length>0 ? (
              <ul className="select-pro-list">
                {this.state.selectedProList.map((item, index) => {
                  return (
                    <li key={item.product_id} className="select-pro-item ellipsis">
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
        <div className="upload-img-con">
          <p className="common-title">请上传发票凭证</p>
          <div className="file-lable">
            <span className="common-select-btn">上传图片</span>
            <input type="file" onChange={this.upLoadImg} accept="image/*"/>
          </div>
          <img className="select-img" src={this.props.formData.imgPath} />
        </div>
        <TouchableOpacity
          className="submit-btn"
          text="提交"
          clickCallBack={this.submitForm}
        />
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
      </main>
    );
  }
  innitData(props) {
    let selectedProList = (props.proData.dataList || []).filter((item) => {
      return item.selectStatus && item.selectNum;
    });
    this.setState({
      selectedProList
    })
  }
  closeAlert() {
    this.setState({
      alertStatus: false,
      alertTips: "",
    });
  }

  submitForm() {
    const { orderSum, name, phoneNo, imgPath } = this.props.formData;
    let alertTips = "";
    if (!orderSum.toString().length) {
      alertTips = "请填写金额";
    } else if (!name.toString().length) {
      alertTips = "请填写姓名";
    } else if (!phoneNo.toString().length) {
      alertTips = "请填写正确手机号";
    } else if (!imgPath.toString().length) {
      alertTips = "请上传发票凭证";
    } else {
      alertTips = "添加数据成功";
      this.props.clearData();
      this.props.clearSelected();
    }
    this.setState({
      alertTips,
      alertStatus: true,
    });
  }

  handleInput(type, event) {
    let value = event.target.value;
    switch (type) {
      case "orderSum":
        value = value.replace(/\D/g, "");
        break;
      case "name":
        break;
      case "phoneNo":
        value = this.props.padStr(
          value.replace(/\D/g, ""),
          [3, 7],
          " ",
          event.target
        );
        break;
      default:
        break;
    }
    this.props.saveFormData(type, value);
  }
  upLoadImg(e) {
    let imgFile = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.props.saveImg(reader.result);
    };
    reader.readAsDataURL(imgFile);
  }
}

const mapStateToProps = (state) => ({
  formData: state.formData,
  proData: state.proData,
});

const mapDispatchToProps = (dispatch) => ({
  //handleClick: ()=> dispatch(addNumber(1)),
  saveFormData: (key, value) => dispatch(saveFormData(key, value)),
  saveImg: (path) => dispatch(saveImg(path)),
  clearData: () => dispatch(clearData()),
  clearSelected: () => dispatch(clearSelected()),
});

Home.propTypes = {
  //state表单数据
  formData: PropTypes.object.isRequired,
  //产品数据
  proData: PropTypes.object.isRequired,
  //保存state表单数据
  saveFormData: PropTypes.func.isRequired,
  //保存图片
  saveImg: PropTypes.func.isRequired,
  //清除formdata
  clearData: PropTypes.func.isRequired,
  //清除选择产品
  clearSelected: PropTypes.func.isRequired,
  //对输入电话的加空格处理
  padStr: PropTypes.func.isRequired,
};

let newHome = connect(mapStateToProps, mapDispatchToProps)(Home);
//高阶组件
export default withPadStr(newHome);
