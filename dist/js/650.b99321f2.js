"use strict";(self["webpackChunkevent"]=self["webpackChunkevent"]||[]).push([[650],{7650:function(e,s,r){r.r(s),r.d(s,{default:function(){return m}});var t=function(){var e=this,s=e._self._c;return s("div",[s("el-card",[s("div",{staticClass:"header",attrs:{slot:"header"},slot:"header"},[e._v("基本资料")]),s("div",{staticClass:"container"},[s("el-form",{ref:"form",attrs:{model:e.userInfo,rules:e.rules}},[s("el-form-item",{attrs:{label:"登录名称"}},[s("el-input",{attrs:{disabled:""},model:{value:e.userInfo.username,callback:function(s){e.$set(e.userInfo,"username",s)},expression:"userInfo.username"}})],1),s("el-form-item",{attrs:{label:"用户昵称",prop:"nickname"}},[s("el-input",{model:{value:e.userInfo.nickname,callback:function(s){e.$set(e.userInfo,"nickname",s)},expression:"userInfo.nickname"}})],1),s("el-form-item",{attrs:{label:"用户邮箱",prop:"email"}},[s("el-input",{model:{value:e.userInfo.email,callback:function(s){e.$set(e.userInfo,"email",s)},expression:"userInfo.email"}})],1)],1),s("el-button",{staticStyle:{"margin-left":"70px"},attrs:{type:"primary"},on:{click:e.submitFn}},[e._v("提交修改")]),s("el-button",{on:{click:e.resetFn}},[e._v("重置")])],1)])],1)},a=[],n=r(7877),i={name:"UserInfo",data(){return{userInfo:{id:this.$store.state.userInfo.id,user_pic:this.$store.state.userInfo.user_pic,username:this.$store.getters.username,nickname:"",email:""},rules:{nickname:[{required:!0,message:"请输入用户昵称",trigger:"blur"},{pattern:/^\S{1,10}$/,message:"必须是1到10位非空字符",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:"blur"}]}}},methods:{submitFn(){this.$refs.form.validate((async e=>{if(!e)return!1;{const{data:e}=await(0,n.cZ)(this.userInfo);if(0!==e.code)return this.$message.error(e.message);this.$message.success(e.message),this.$store.dispatch("getUserInfo")}}))},resetFn(){this.$refs.form.resetFields()}}},l=i,u=r(1001),o=(0,u.Z)(l,t,a,!1,null,"2301be41",null),m=o.exports}}]);
//# sourceMappingURL=650.b99321f2.js.map