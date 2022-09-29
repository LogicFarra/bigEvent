import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'      //获取用户信息
Vue.use(Vuex)
export default new Vuex.Store({
    actions: {
        // 获取当前用户信息
        async getUserInfo(context) {
            const { data: result } = await getUserInfoAPI()
            if(result.code === 0){
                context.commit('updateUserInfo',result.data)
            }else{
                return false
            }
        },
       
    },
    mutations: {
        // 更新token
        updateToken(state, newToken) {
            state.token = newToken
        },
        // 更新用户信息
        updateUserInfo(state, value) {
            state.userInfo = value
        },
    },
    state: {
        token: '', //保存token信息
        userInfo: {},  //当前登录的用户详细信息
    },
    getters: {
        username:state => state.userInfo.username,     //用户名
        nickname:state => state.userInfo.nickname,     //昵称
        profile:state => state.userInfo.user_pic       //头像
    },
    modules: {},
    plugins: [
        createPersistedState() //持久化存储vuex插件
    ]
})