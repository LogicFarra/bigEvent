const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  // 影响打包时index.html引入其他资源时的地址
  // 开发环境 '/'
  //生产环境 './'
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack:{
    externals:{
      'element-ui':'ELEMENT',
      'echarts':'echarts',
      'vue':'Vue',
      'vue-router':'VueRouter',
      'vuex':'Vuex',
      'axios':'axios',
      'dayjs':'dayjs',
      'vue-quill-editor':'VueQuillEditor',
      'vuex-persistedstate':'createPersistedState'
    }
  },
})
