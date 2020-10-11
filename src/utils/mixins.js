/**
 * 用途：字符串填充函数
 * @value {string} 需要修改填充的值
 * @position {arrary} 填充的目标位置
 * @padStr {string} 要填充的东西（字符串）
 * @inputTarget {element} 目标元素
 */
export const padStr = (value, position, padStr, inputTarget) => {
  position.foreach((item, index) => {
    if (value.length > item + index) {
      value =
        value.substring(0, item + index) +
        padStr +
        value.substring(item + index);
    }
    //去除首尾空格
    value = value.trim();
    // 解决安卓部分浏览器插入空格后光标错位问题
    requestAnimationFrame(() => {
      inputTarget.setSelectionRange(value.length, value.length);
    });
    return value;
  });
};
