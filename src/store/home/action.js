import * as home from "./action-type";

//保存表单数据
export const saveFormData = (key, value) => ({
  type: home.SAVEFORMDATA,
  key,
  value
});

//保存图片
export const saveImg = (path) => ({
  type: home.SAVEIMG,
  path
});

//清除表单数据
export const clearData = () => ({
  type: home.CLEARDATA
});
