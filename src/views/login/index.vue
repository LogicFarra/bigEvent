<template>
  <div>
    <div class="container">
      <div class="box">
        <h2>后台管理系统</h2>
        <el-form :model="loginData" :rules="rulesObj" ref="login">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              type="text"
              v-model="loginData.username" 
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="loginData.password"
              ref="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginFn">登录</el-button>
          </el-form-item>
        </el-form>
        <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import {loginAPI} from '@/api'
export default {
  name: "LoginView",
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      // 输入框校验
      rulesObj: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: "用户名必须是1-10位字母和数字",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码必须是6-15位非空字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods:{
    ...mapMutations(['updateToken']),
    // 登录后
    loginFn(){
      this.$refs.login.validate(async (valid)=>{
        if(valid){
          const {data:result} = await loginAPI(this.loginData)
          if(result.code !== 0) return this.$message.error(result.message)
          this.$message.success(result.message)   //弹出登录成功提示框
          this.updateToken(result.token)          //更新token
          this.$router.push('/')                  //路由跳转到主页面
        }else{
          return false
        }
      })
    },
  }
};
</script>

<style scoped lang="less">
body {
  height: 100vh;
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(./bg.jpg);
    background-size: cover;
    .box {
      width: 300px;
      text-align: center;
      background-color: rgba(43, 37, 37, 0);
      border: none;
      backdrop-filter: blur(5px);
      padding: 15px;
      border-radius: 10px;
      h2 {
        color: white;
      }
      .el-form {
        /deep/.el-input__inner {
          background-color: transparent;
          border: none;
          border-bottom: 1px solid white;
          color: white;
        }
      }
      .el-button {
        width: 100%;
        background-color: gray;
        border: none;
        font-size: 16px;
        &:hover {
          box-shadow: 0 0 45px rgba(130, 130, 130, 0.384);
          text-shadow: 0 0 5px white;
        }
      }
      .el-link {
        float: left;
      }
    }
  }
}
</style>