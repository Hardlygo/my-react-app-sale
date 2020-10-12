/**
 * actionCreator
 * 类似购物车（包含了对购物车的操作）
 */
import * as pro from "./action-type";
import API from "../../api/api";

//请求商品数据，并初始化
const receiveData = (list) => ({
  type: pro.GETPRODUCTION,
  dataList: list
});

export const getProData = () => {
  return async (dispatch) => {
    try {
      console.log(66);
      let result = await API.getProduction();
      console.log(result)
      result.map((item) => ({
        ...item,
        selectStatus: false,
        selectNum: 0
      }));
      dispatch(receiveData(result));
    } catch (error) {}
  };
};

//选中商品
export const selectPro = (index) => ({
  type: pro.TOGGLESELECT,
  index
});

//编辑商品
export const editPro = (index, selectNum) => ({
  type: pro.EDITPRODUCTION,
  index,
  selectNum
});

//清空商品
export const clearSelected = () => ({
  type: pro.CLEARSELECTED
});
