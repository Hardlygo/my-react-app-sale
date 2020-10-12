import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { is, fromJS } from "immutable";
//action
import { getProData, selectPro, editPro } from "../../store/production/action";

//头部组件
import Header from "../../components/header";

import "./index.less";

export class Production extends Component {
  static propTypes = {
    proData: PropTypes.object.isRequired,
    getProData: PropTypes.func.isRequired,
    selectPro: PropTypes.func.isRequired,
    editPro: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (!this.props.proData.dataList.length) {
      this.props.getProData();
    }
  }
  //重现渲染条件
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  render() {
    return (
      <main className="pro-container">
        <Header headerTitle="选择产品" confirm />
        <section className="pro-list-con">
          <ul className="pro-list-ul">
            {this.props.proData.dataList.map((item, index) => {
              return (
                <li key={index} className="pro-item">
                  <div
                    className="pro-item-select"
                    onClick={this.selectPro.bind(this, index)}
                  >
                    <span
                      className={`icon-xuanze1 pro-select-status ${
                        item.selectStatus ? "pro-selected" : ""
                      }`}
                    ></span>
                    <span className="pro-name">{item.product_name}</span>
                  </div>
                  <div className="pro-item-edit">
                    <span
                      className={`icon-jian ${
                        item.selectNum > 0 ? "edit-active" : ""
                      }`}
                    ></span>
                    <span className="pro-num">{item.selectNum}</span>
                    <span
                      className={`icon-jia`}
                      onClick={this.handleEdit.bind(this, index, 1)}
                    ></span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    );
  }

  toggleSelect(index) {
    this.props.selectPro(index);
  }
  /**
   * 添加或删减商品，交由redux进行数据处理，作为全局变量
   * @param  {int} index 编辑的商品索引
   * @param  {int} num   添加||删减的商品数量
   */
  handleEdit(index, num) {
    let currentNum = this.props.proData.dataList[index].selectNum + num;
    if (currentNum < 0) return;
    this.props.editPro(index, currentNum);
  }
}

const mapStateToProps = (state) => ({
  proData: state.proData,
});

const mapDispatchToProps = (dispatch) => ({
  getProData: () => dispatch(getProData()),
  selectPro: (index) => dispatch(selectPro(index)),
  editPro: (index, selectNum) => dispatch(editPro(index, selectNum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Production);
