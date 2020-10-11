import React from "react";
import { padStr } from "../../utils/mixins";

//为了把padStr方法注入到目标组件中
export default function withPadStr(Component) {
  return class extends React.Component {
    render() {
      // 将 input 组件包装在容器中，而不对其进行修改。Good!
      return <Component padStr={padStr} {...this.props} />;
    }
  };
}
