<template>
  <div>
    <el-card>
      <div slot="header" class="header">基本资料</div>
      <div class="container">
        <el-form :model="userInfo" :rules="rules" ref="form">
          <el-form-item label="登录名称">
            <el-input disabled v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" style="margin-left: 70px" @click="submitFn"
          >提交修改</el-button
        >
        <el-button @click="resetFn">重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 更新用户信息接口
import { updateUserInfoAPI } from "@/api";
export default {
  name: "UserInfo",
  data() {
    return {
        // 收集用户信息
      userInfo: {
        id: this.$store.state.userInfo.id,              //从vuex提取id
        user_pic: this.$store.state.userInfo.user_pic,  //从vuex提取用户头像
        username: this.$store.getters.username,         //从vuex提取用户名
        nickname: "",                                   //收集修改的昵称
        email: "",                                      //收集修改的邮箱
      },
    //   输入框校验
      rules: {
        nickname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "必须是1到10位非空字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //   提交修改回调函数
    submitFn() {
        // 兜底校验
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { data: result } = await updateUserInfoAPI(this.userInfo)
          if (result.code !== 0) return this.$message.error(result.message)
          this.$message.success(result.message) 
          this.$store.dispatch("getUserInfo")
        }else{
            return false
        }
      });
    },
    resetFn(){
      this.$refs.form.resetFields()
    }
  },
};
</script>

<style scoped lang="less">
.el-card {
  .header {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .container {
    .el-form-item {
      .el-input {
        width: 300px;
      }
    }
  }
}
</style>