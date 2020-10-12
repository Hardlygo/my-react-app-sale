import axios from "axios";
import envconfig from "../envconfig";

/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params conf {object}  覆盖默认的配置 如get可在conf加data传参，post可在params传参
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：conf中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在conf中带入
 * 文档地址：https://github.com/axios/axios#axios-api
 */
export default class Server {
  http(method, url, conf) {
    return new Promise((resolve, reject) => {
      if (typeof conf !== "object") {
        conf = {};
      }
      const _option = {
        method,
        url,
        baseURL: envconfig.baseUrl,
        timeout: 30000,
        params: null,
        data: null,
        headers: null,
        withCredentials: true, //是否携带cookies发起请求
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
        ...conf
      };
      axios
        .request(_option)
        .then((res) => {
          resolve(
            typeof res.data === "object" ? res.data : JSON.stringify(res.data)
          );
        })
        .catch((e) => {
          if (e.response) {
            reject(e.response.data);
          } else {
            reject(e);
          }
        });
    });
  }
}
//添加静态属性
Server.baseURL = envconfig.baseUrl;
