import axios from "axios"
import store from "@/store"
import router from "@/router"
import { Message } from "element-ui"
export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
    baseURL:baseURL
})
// 请求拦截器
myAxios.interceptors.request.use(function(config){
    if(store.state.token) config.headers.Authorization = store.state.token
    return config
},function(error){
    return Promise.reject(error)
})

// 响应拦截器
myAxios.interceptors.response.use(function(response){
    return response
},function(error){
    if(error.response.status === 401){
        store.commit('updateToken','')
        store.commit('updateUserInfo',{})
        router.push('/login')
        Message.error('用户身份已过期，请重新登录')
    }
})

export default myAxios