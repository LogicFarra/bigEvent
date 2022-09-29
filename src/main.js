import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import dayjs from 'dayjs'
import '@/assets/global.less' //重置样式表
import '@/elemenUI/index'     //element-ui
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

Vue.prototype.$formatDate = (dateObj)=>{
  return dayjs(dateObj).format('YYYY-MM-DD HH:mm:ss')
}
// 全局注册富文本编辑器
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
