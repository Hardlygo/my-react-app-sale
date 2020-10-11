/**
 * 全局环境配置文件
 */

let baseUrl;
let imgUrl = "//elm.cangdu.org/img/";

if (process.env.NODE_ENV === "development") {
  baseUrl = "//api.cangdu.org";
} else {
  baseUrl = "//api.cangdu.org";
}

export default {
  baseUrl,
  imgUrl
};
