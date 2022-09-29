<template>
  <div>
    <div class="container">
      <div class="box">
        <h2>后台管理系统</h2>
        <el-form :model="registerData" :rules="rulesObj" ref="register">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              type="text"
              v-model="registerData.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              v-model="registerData.password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              placeholder="请确认密码"
              type="password"
              v-model="registerData.repassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="registerFn">注册</el-button>
          </el-form-item>
        </el-form>
        <el-link type="info" @click="$router.push('/login')">去登录</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { registerAPI } from "@/api";
export default {
  name: "RegisterView",
  data() {
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.registerData.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      registerData: {
        username: "",
        password: "",
        repassword: "",
      },
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
        repassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码必须是6-15位非空字符",
            trigger: "blur",
          },
          { validator: samePwdFn, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    registerFn() {
      this.$refs.register.validate(async (valid) => {
        if (valid) {
          const {data:result} = await registerAPI(this.registerData)
          if(result.code !== 0) return this.$message.error(result.message)
          this.$message.success(result.message)
          this.$router.push('/login')
        } else {
          return false;
        }
      });
    },
  },
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
    // background-image: url(./backgoundImg.jpg);
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