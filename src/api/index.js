import request from '@/utils/request'

/**
 * 
 * @param {*} param0 {uesrname:用户名 , password:密码 , repassword:确认密码}
 * @returns promise对象
 */
// 用户注册
export const registerAPI = ({username,password,repassword}) => {
    return request({
        url:'/api/reg',
        method:'POST',
        data:{
            username,
            password,
            repassword
        }
    })
}

/**
 * 
 * @param {*} param0 {username:用户名,password:密码}
 * @returns promise对象
 */
// 用户登录
export const loginAPI = ({username,password}) =>{
    return request({
        url:'/api/login',
        method:'POST',
        data:{
            username,
            password
        }
    })
}

// 获取用户详细信息
export const getUserInfoAPI = ()=>{
    return request({
        url:'/my/userinfo'
    })
}

// 获取侧边栏菜单
export const getAsideMenuAPI = ()=>{
    return request({
        url:'/my/menus'
    })
}

// 更新用户信息
export const updateUserInfoAPI = ({id,email,nickname,user_pic,username})=>{
    return request({
        url:'/my/userinfo',
        method:'PUT',
        data:{
            id,
            email,
            nickname,
            user_pic,
            username
        }
    })
}

// 更新用户头像
export const updateUserAvatar = (avatar)=>{
    return request({
        url:'/my/update/avatar',
        method:"PATCH",
        data:{
            avatar
        }
    })
}

//更新用户密码
export const updatePwd = ({ old_pwd , new_pwd , re_pwd})=>{
   return request({
    url:'/my/updatepwd',
    method:"PATCH",
    data:{
        old_pwd,
        new_pwd,
        re_pwd,
    }
   })
}

// 请求文章分类数据
export const getArtcleData = ()=>{
    return request({
        url:'/my/cate/list'
    })
}

// 保存添加的文章分类
export const addArtcle = ({cate_name,cate_alias})=>{
    return request({
        url:'/my/cate/add',
        method:'POST',
        data:{
            cate_name,
            cate_alias
        }
    })
}

// 编辑分类
export const updateArtcle = ({id,cate_name,cate_alias})=>{
    return request({
        url:'/my/cate/info',
        method:"PUT",
        data:{
            id,
            cate_name,
            cate_alias
        }
    })
}
// 删除分类
export const delArtCateAPI = (id) => {
    return request({
      url: '/my/cate/del',
      method: 'DELETE',
      params: {
        id
      }
    })
  }
/**
 * 发布文章
 * @param {*} fd 表单对象
 * @returns Promise对象
 */
 export const uploadArticleAPI = (fd) => {
    return request({
      url: '/my/article/add',
      method: 'POST',
      data: fd // 参数要的是表单对象, 不能写普通对象, axios内部会判断, 如果是表单对象, 传递的请求体会设置Content-Type: form-data与后端对应
    })
  }

// 请求文章列表
export const getArtclesAPI = ({pagenum,pagesize,cate_id,state})=>{
    return request({
        url:'/my/article/list',
        method:'GET',
        params:{
            pagenum,
            pagesize,
            cate_id,
            state
        }
    })
}
// 查询文章详情
export const getArtcleDetailAPI = (id)=>{
    return request({
        url:'/my/article/info',
        params:{
            id
        }
    })
}
// 删除文章
export const deleteArtcleAPI = (id)=>{
    return request({
        url:"/my/article/info",
        method:'DELETE',
        params:{
            id
        }
    })
}