"use strict";(self["webpackChunkevent"]=self["webpackChunkevent"]||[]).push([[369],{7369:function(e,t,s){s.r(t),s.d(t,{default:function(){return g}});var a=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"container"},[t("div",{staticClass:"box"},[t("h2",[e._v("后台管理系统")]),t("el-form",{ref:"login",attrs:{model:e.loginData,rules:e.rulesObj}},[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{attrs:{placeholder:"请输入账号",type:"text"},model:{value:e.loginData.username,callback:function(t){e.$set(e.loginData,"username",t)},expression:"loginData.username"}})],1),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{ref:"password",attrs:{placeholder:"请输入密码",type:"password"},model:{value:e.loginData.password,callback:function(t){e.$set(e.loginData,"password",t)},expression:"loginData.password"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.loginFn}},[e._v("登录")])],1)],1),t("el-link",{attrs:{type:"info"},on:{click:function(t){return e.$router.push("/reg")}}},[e._v("去注册")])],1)])])},r=[],n=s(6294),i=s(7877),o={name:"LoginView",data(){return{loginData:{username:"",password:""},rulesObj:{username:[{required:!0,message:"请输入账号",trigger:"blur"},{pattern:/^[a-zA-Z0-9]{1,10}$/,message:"用户名必须是1-10位字母和数字",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{pattern:/^\S{6,15}$/,message:"密码必须是6-15位非空字符",trigger:"blur"}]}}},methods:{...(0,n.mapMutations)(["updateToken"]),loginFn(){this.$refs.login.validate((async e=>{if(!e)return!1;{const{data:e}=await(0,i.UO)(this.loginData);if(0!==e.code)return this.$message.error(e.message);this.$message.success(e.message),this.updateToken(e.token),this.$router.push("/")}}))}}},l=o,u=s(1001),p=(0,u.Z)(l,a,r,!1,null,"8b2145c0",null),g=p.exports}}]);
//# sourceMappingURL=369.9ec1483f.js.map