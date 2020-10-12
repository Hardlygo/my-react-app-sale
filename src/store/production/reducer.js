import * as pro from "./action-type";
import immutable from "immutable";

let defaultState = {
  /**
   * 商品数据
   * @type {Array}
   * example: [{
   *    product_id: 1, 商品ID
   *    product_name: "PaiBot（2G/32G)", 商品名称
   *    product_price: 2999, 商品价格
   *    commission: 200, 佣金
   *    selectStatus: false, 是否选择
   *    selectNum: 0, 选择数量
   * }]
   */
  dataList: [],
};

export const proData = (state = defaultState, action) => {
  let immuteDataList;
  let immuteItem;
  const type = action.type;
  switch (type) {
    case pro.GETPRODUCTION:
      //不修改原数据
      immuteDataList = immutable.fromJS(action.dataList);
      // redux必须返回一个新的state

      return { ...state, ...{ dataList: immuteDataList.toJS() } };
    case pro.TOGGLESELECT:
      immuteDataList = immutable.fromJS(state.dataList);
      immuteItem = immutable.Map(state.dataList[action.index]);
      immuteItem = immuteItem.set(
        "selectStatus",
        !immuteItem.get("selectStatus")
      );
      immuteDataList = immuteDataList.set(action.index, immuteItem);
      return { ...state, ...{ dataList: immuteDataList.toJS() } };
    case pro.EDITPRODUCTION:
      immuteDataList = immutable.fromJS(state.dataList);
      immuteItem = immutable.Map(state.dataList[action.index]);
      immuteItem = immuteItem.set("selectNum", action.selectNum);
      immuteDataList = immuteDataList.set(action.index, immuteItem);
      return { ...state, ...{ dataList: immuteDataList.toJS() } };
    case pro.CLEARSELECTED:
      //对面上面的list方法
      immuteDataList = immutable.fromJS(state.dataList);
      for (let i = 0; i < state.dataList.length; i++) {
        immuteDataList.update(i, (item) => {
          item = item.set("selectNum", 0);
          item = item.set("selectStatus", false);
          return item;
        });
      }
      return { ...state, ...{ dataList: immuteDataList.toJS() } };

    default:
      return state;
  }
};
