/**
 * actionCreator
 * 类似购物车（包含了对购物车的操作）
 */
import * as pro from "./action-type";
import API from "../../api/api";

const requestData = () => ({
  type: pro.REQUESTPRODUCTION,
});

//请求商品数据，并初始化
const receiveData = (list) => ({
  type: pro.GETPRODUCTION,
  dataList: list,
});

export const getProData = () => {
  return async (dispatch) => {
    try {
      dispatch(requestData());
      let result = await API.getProduction();

      result = result.map((item) => ({
        ...item,
        selectStatus: true,
        selectNum: 0,
      }));

      dispatch(receiveData(result));
    } catch (error) {}
  };
};

//选中商品
export const selectPro = (index) => ({
  type: pro.TOGGLESELECT,
  index,
});

//编辑商品
export const editPro = (index, selectNum) => ({
  type: pro.EDITPRODUCTION,
  index,
  selectNum,
});

//清空商品
export const clearSelected = () => ({
  type: pro.CLEARSELECTED,
});
