<template>
  <div class="myLayout">
    <el-container direction="vertical" style="100%" class="acontainer">
      <!-- 头部 -->
      <el-header>
        <!-- 头部左侧 logo -->
        <img src="./images/logo.png" alt="" />
        <!-- 头部右侧 操作区域 -->
        <div class="right">
          <!-- 头部右侧 操作区域 头像 -->
          <img src="./images/userImg.jpg" alt="" class="profile" />
          <!-- 头部右侧 操作区域 个人中心-->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <!-- 个人中心二级菜单 -->
            <el-dropdown-menu slot="dropdown" click="jumpPage">
              <el-dropdown-item
                icon="el-icon-s-operation"
                @click.native="jumpPage('/user-info')"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-user-solid"
                @click.native="jumpPage('/user-avatar')"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-key"
                @click.native="jumpPage('/user-pwd')"
                >重置密码</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 退出按钮 -->
          <div class="el-icon-switch-button logout" @click="logoutFn">退出</div>
        </div>
      </el-header>
      <el-container class="main-container">
        <!-- 侧边导航栏 -->
        <el-aside width="200px">
          <!-- 用户基本信息 -->
          <div class="userInfomation">
            <img v-if="profile" :src="profile" alt="" />
            <img src="./images/userImg.jpg" alt="" v-else />
            <p>欢迎 {{ nickname || username }}</p>
          </div>
          <!-- 导航区域 -->
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#6e6e73"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <!-- 没有子元素 -->
            <el-menu-item
              :index="item.indexPath"
              v-for="item in noChild"
              :key="item.title"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <!-- 有子元素 -->
            <el-submenu
              :index="item.indexPath"
              v-for="item in hasChild"
              :key="item.title"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                :index="item2.indexPath"
                v-for="item2 in item.children"
                :key="item2.title"
              >
                <i :class="item2.icon"></i>
                <span>{{ item2.title }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 二级挂载点 -->
            <router-view></router-view>
          </el-main>
          <el-footer style="height: 30px"
            ><p>www.itheima.com-黑马程序员</p></el-footer
          >
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getAsideMenuAPI } from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "myLayout",
  data() {
    return {
      menu: [],
    };
  },
  computed: {
    ...mapGetters(["username", "nickname", "profile"]),
    noChild() {
      return this.menu.filter((item) => !item.children);
    },
    hasChild() {
      return this.menu.filter((item) => item.children);
    },
  },
  created() {
    this.getMenuList();
  },
  methods: {
    // 退出登录函数
    logoutFn() {
      //$confirm 是element-ui设置的，会弹出提示框，第一个参数是提示文字，第二个参数是提示标题
      this.$confirm("是否需要退出登录？", "提示", {
        confirmButtonText: "确定", //确认按钮的文字
        cancelButtonText: "取消", //取消按钮的文字
        type: "warning", //提示框的类型
      }).then(() => {
        this.$store.commit("updateToken", ""); //清空token
        this.$store.commit("updateUserInfo", {}); //清空当前用户信息
        this.$router.push("/login"); //跳转到登录页面
      });
    },
    jumpPage(target) {
      this.$router.push(target);
    },
    async getMenuList() {
      const { data: res } = await getAsideMenuAPI();
      if (res.code === 0) this.menu = res.data;
    },
  },
};
</script>

<style scoped lang="less">
// 整个页面
.acontainer {
  padding: 0 !important;
  margin: 0 !important;
  height: 100vh;
  // 头部
  .el-header {
    background-color: #000000cc;
    line-height: 60px;
    // 头部右侧操作区域
    .right {
      float: right;
      display: flex;
      align-items: center;
      // 右侧的头像
      .profile {
        background-image: url("./images/userImg.jpg");
        background-size: cover;
        width: 40px;
        height: 40px;
        border-radius: 50px;
      }
      // 个人中心
      .el-dropdown {
        cursor: pointer;
        margin-left: 10px;
      }
      // 退出登录
      .logout {
        color: white;
        cursor: pointer;
        margin-left: 20px;
        &:hover {
          color: gray;
        }
      }
    }
  }
  // 侧边栏
  .el-aside {
    background-color: #6e6e73;
    // 用户信息
    .userInfomation {
      padding: 0 15px;
      display: flex;
      height: 60px;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50px;
      }
      p {
        margin-left: 10px;
        color: white;
      }
    }
  }
  // 底部
  .el-footer {
    color: white;
    text-align: center;
    line-height: 30px;
    background-color: silver;
    font-size: 14px;
    p {
      margin: 0;
    }
  }
}
</style>