<template>
  <el-card>
    <div
      slot="header"
      style="text-align: center; font-size: 20px; font-weight: bold"
    >
      用户密码
    </div>
    <div class="container">
      <el-form :model="pwdData" :rules="rules" ref="form">
        <el-form-item label="原密码" label-width="80px" prop="old_pwd">
          <el-input
            type="text"
            style="width: 300px"
            v-model="pwdData.old_pwd"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改密码" label-width="80px" prop="new_pwd">
          <el-input
            type="text"
            style="width: 300px"
            v-model="pwdData.new_pwd"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px" prop="re_pwd">
          <el-input
            type="text"
            style="width: 300px"
            v-model="pwdData.re_pwd"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="update">确认修改</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import {updatePwd} from '@/api'
export default {
  name: "UserPassword",
  data(){
        // 判断新旧密码是否相同
        const samePwd = (rule,value,callback)=>{
            if(value === this.pwdData.old_pwd){
               return callback(new Error('新旧密码不能相同！'))
            }
                callback()
        }
        // 判断新密码与确认密码是否相同
        const re_pwdPwd = (rule,value,callback)=>{
            if(value !== this.pwdData.new_pwd){
               return callback(new Error('两次新密码不一致！'))
            }
                callback()

        }
        return {
            pwdData:{
                old_pwd:'',
                new_pwd:'',
                re_pwd:''
            },
            rules:{
                old_pwd:[
                    {required:true,message:'请输入原密码',trigger:'blur'},
                    {pattern:/^\S{6,15}$/,message:'密码必须是6到15未非空字符串',trigger:'blur'},
                ],
                new_pwd:[
                    {required:true,message:'请输入新密码',trigger:'blur'},
                    {pattern:/^\S{6,15}$/,message:'密码必须是6到15未非空字符串',trigger:'blur'},
                    {validator:samePwd,trigger:'blur'}
                ],
                re_pwd:[
                    {required:true,message:'请确认密码',trigger:'blur'},
                    {pattern:/^\S{6,15}$/,message:'密码必须是6到15未非空字符串',trigger:'blur'},
                    {validator:re_pwdPwd,trigger:'blur'}
                ]
            },
        }
    },
    methods:{
    reset(){
      this.$refs.form.resetFields()
    },
    update(){
      this.$refs.form.validate( async (valid)=>{
        if(valid){
          const {data:res} = await updatePwd(this.pwdData)
          if(res.code !==0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.reset()
        }else{
          return false
        }
      })
    }
    }
};
</script>

<style>
</style>