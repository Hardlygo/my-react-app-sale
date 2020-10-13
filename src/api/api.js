import Server from "./server";

class API extends Server {
  /**
   * 用途：上传图片
   * @url https://elm.cangdu.org/v1/addimg/shop
   * status返回1表示成功
   * @method post
   * @return {promise}
   */
  async uploadImg(params = {}) {
    try {
      let result = await this.http(
        "post",
        "//elm.cangdu.org/v1/addimg/shop",
        params
      );
      if (result && result.status === 1) {
        return result;
      } else {
        const e = {
          msg: "上传图片失败",
          response: result,
          params,
          url: "//elm.cangdu.org/v1/addimg/shop",
        };
        throw e;
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   *  用途：获取记录数据
   *  @url https://api.cangdu.org/shopro/data/record
   *  返回http_code为200表示成功
   *  @method get
   *  @return {promise}
   */
  async getRecords(params = {}) {
    try {
      let result = await this.http(
        "get",
        `/shopro/data/record/${params.type}`,
        params
      );
      if (
        result &&
        result.data instanceof Object &&
        result.http_code === 200
      ) {
        return result.data;
      } else {
        const e = {
          msg: "获取记录数据失败",
          response: result,
          params,
          url: API.baseURL + `/shopro/data/record/${params.type}`,
        };
        throw e;
      }
    } catch (e) {
      throw e;
    }
  }
  /**
   * 用途：获取产品数据
   * @url https://api.cangdu.org/shopro/data/products
   * 返回http_code为200表示成功
   * @method get
   * @return {promise}
   */
  async getProduction(params = {}) {
    try {
      const result = await this.http("get", "/shopro/data/products", params);
      if (result && result.http_code === 200) {
        return result.data.data || [];
      } else {
        const e = {
          msg: "获取商品数据异常",
          response: result,
          params,
          url: API.baseURL + "/shopro/data/products",
        };
        throw e;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 用途：获取佣金数据
   * @url /shopro/data/balance
   * @method get
   * @return {promise}
   * http_code返回200为成功
   */
  async getBalance(params = {}) {
    try {
      const result = await this.http("get", "/shopro/data/balance", params);
      if (
        result &&
        result.data instanceof Object &&
        result.http_code === 200
      ) {
        return result.data.data || {};
      } else {
        const e = {
          msg: "获取佣金数据失败",
          response: result,
          params,
          url: API.baseURL + "/shopro/data/balance",
        };
        throw e;
      }
    } catch (e) {
      throw e;
    }
  }
}

export default new API();
