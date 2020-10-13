import React, { Component } from "react";
import { is, fromJS } from "immutable";
import API from "@/api/api";

import "./index.less";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordData: [],
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !is(fromJS(this.props), fromJS(nextProps)) ||
      !is(fromJS(this.state), fromJS(nextState))
    );
  }
  componentDidMount() {
    console.log(this.props.location);
    let type = this.props.location.pathname.split("/")[2];
    this.getRecord(type);
  }
  componentDidUpdate(prevProps) {
       // 判断类型是否重复
    let currenType = this.props.location.pathname.split('/')[2];
    let prevType = prevProps.location.pathname.split('/')[2];
    if(currenType !== prevType){
      this.getRecord(currenType);
    }
  }
  render() {
    return (
      <div>
        <ul className="record-list-con">
          {this.state.recordData.map((item, index) => {
            return (
              <li className="record-list-item" key={index}>
                <section className="item-header">
                  <span>创建时间{item.created_at}</span>
                  <span>{item.type_name}</span>
                </section>
                <section className="item-content">
                  <p>
                    <span>用户名：</span> {item.customers_name} &emsp;电话：
                    {item.customers_phone}
                  </p>
                  <p>
                    <span>商&emsp;品：</span>
                    {item.product[0].product_name}
                  </p>
                  <p>
                    <span>金&emsp;额：</span>
                    {item.sales_money} &emsp; 佣金：{item.commission}
                  </p>
                </section>
                <p className="item-footer">
                  等待管理员审核，审核通过后，佣金将结算至账户
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  /**
   * 初始化获取数据
   * @param  {string} type 数据类型
   */
  getRecord = async (type) => {
    try {
      let result = await API.getRecords({ type });
      this.setState({ recordData: result.data || [] });
    } catch (err) {
      console.error(err);
    }
  };
}

export default index;
