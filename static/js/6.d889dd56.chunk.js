(this["webpackJsonpmy-first-react-app"]=this["webpackJsonpmy-first-react-app"]||[]).push([[6],{79:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t),a.d(t,"Production",(function(){return p}));var s=a(0),c=a.n(s),n=a(20),r=a(1),i=a(29),o=a(25);a(79);class p extends s.Component{componentDidMount(){this.props.proData.dataList.length||this.props.getProData()}shouldComponentUpdate(e,t){return!Object(r.c)(Object(r.b)(this.props),Object(r.b)(e))||!Object(r.c)(Object(r.b)(this.state),Object(r.b)(t))}render(){return c.a.createElement("main",{className:"pro-container"},c.a.createElement(o.a,{headerTitle:"\u9009\u62e9\u4ea7\u54c1",confirm:!0}),c.a.createElement("section",{className:"pro-list-con"},this.props.proData.isFetching?c.a.createElement("div",{className:"loading-tip"}," \u6b63\u5728\u52a0\u8f7d\u4e2d..."):c.a.createElement("ul",{className:"pro-list-ul"},this.props.proData.dataList.map((e,t)=>c.a.createElement("li",{key:t,className:"pro-item"},c.a.createElement("div",{className:"pro-item-select",onClick:()=>{this.props.selectPro(t)}},c.a.createElement("span",{className:"icon-xuanze1 pro-select-status ".concat(e.selectStatus?"pro-selected":"")}),c.a.createElement("span",{className:"pro-name"},e.product_name)),c.a.createElement("div",{className:"pro-item-edit"},c.a.createElement("span",{className:"icon-jian ".concat(e.selectNum>0?"edit-active":""),onClick:this.handleEdit.bind(this,t,-1)}),c.a.createElement("span",{className:"pro-num"},e.selectNum),c.a.createElement("span",{className:"icon-jia",onClick:this.handleEdit.bind(this,t,1)})))))))}toggleSelect(e){this.props.selectPro(e)}handleEdit(e,t){var a=this.props.proData.dataList[e].selectNum+t;a<0||this.props.editPro(e,a)}}t.default=Object(n.b)(e=>({proData:e.proData}),e=>({getProData:()=>e(Object(i.c)()),selectPro:t=>e(Object(i.d)(t)),editPro:(t,a)=>e(Object(i.b)(t,a))}))(p)}}]);
//# sourceMappingURL=6.d889dd56.chunk.js.map