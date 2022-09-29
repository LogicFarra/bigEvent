<template>
  <el-card>
      <div slot="header" style="text-align:center;font-size:20px;font-weight: bold;">用户头像</div>
      <div class="container">
          <img v-if="!avatar" src="@/assets/images/default.png" alt="">
          <img v-else :src="avatar" alt="">
          <input type="file" accept="image/*" style="display:none" @change="picFile" ref="input">
          <br>
          <el-button @click="chooseImg">选择图片</el-button>
          <el-button @click="updateAvatar">上传头像</el-button>
      </div>
  </el-card>
</template>

<script>
// 更新用户头像接口
import { updateUserAvatar } from '@/api'
export default {
    name:'UserAvatar',
    data(){
        return {
            avatar:''
        }
    },
    methods:{
        picFile(e){
            const data = e.target.files
            if(data.length === 0){
                return
            }else{
                // 把图片转换成base64的字符串
                const a = new FileReader()
                a.readAsDataURL(data[0])
                a.onload = (e)=>{
                    this.avatar = e.target.result
                }
            }
        },
        chooseImg(){
            this.$refs.input.click()
        },
        async updateAvatar(){
           const {data:res} = await updateUserAvatar(this.avatar)
           if(res.code !== 0) return this.$message.error(res.message)
           this.$message.success(res.message)
           this.$store.dispatch('getUserInfo')
        }
    }
}   
</script>

<style scoped lang="less">
    .container{
        img{
            width: 200px;
            height:200px;
        }
        .el-button{
            margin-top:20px;
        }
    }
</style>