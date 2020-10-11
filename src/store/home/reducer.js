import * as home from "./action-type";

let defaultState = {
  orderSum: "", //销售金额
  name: "", //客户姓名
  phoneNo: "", //客户电话
  imgPath: "" //发票凭证图片
};

export const formData = (state = defaultState, action = {}) => {
  let type = action.type;
  switch (type) {
    case home.SAVEFORMDATA:
      return { ...state, [action.key]: action.value };
    case home.SAVEIMG:
      return { ...state, imgPath: action.path };
    case home.CLEARDATA:
      return { ...state, ...defaultState };
    default:
      return state;
  }
};
