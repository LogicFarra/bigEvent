<template>
  <div>
    <el-card>
      <div slot="header" style="font-size: 20px; font-weight: bold">
        文章列表
      </div>
      <div class="container">
        <el-form label-width="80px" inline :model="formData" ref="filterForm">
          <el-form-item label="文章分类">
            <el-select placeholder="请选择分类" v-model="formData.cate_id">
              <el-option
                v-for="item in ArtcleList"
                :key="item.id"
                :label="item.cate_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select placeholder="请选择状态" v-model="formData.state">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <template>
            <el-button @click="filterFn">筛选</el-button>
            <el-button @click="resetFn">重置</el-button>
          </template>
        </el-form>
        <el-button @click="dialogVisible = true">发表文章</el-button>
      </div>
      <el-table :data="artcles.data" style="width: 100%; margin-top: 20px">
        <el-table-column label="文章标题" prop="title">
          <template v-slot="scope">
            <el-link type="primary" @click="artcleDetail(scope.row.id)">{{scope.row.title}}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="文章分类" prop="cate_name"></el-table-column>
        <el-table-column label="发布时间" prop="pub_date">
          <template v-slot="scope">
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button @click="deleteArtcle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align:center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="formData.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size.sync="formData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="artcles.total"
      >
      </el-pagination>
    </el-card>
    <!-- 发布文章的对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="dialogCloseFn"
      fullscreen
    >
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <!--  -->
        <div class="top">
          <div class="left">
            <el-form-item label="文章封面">
              <img
                src="../../assets//images/cover.jpg"
                alt=""
                @click="selCover"
                ref="coverImg"
              />
              <input type="file" ref="cover" @change="chooseCover" />
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="文章标题" prop="title">
              <el-input
                v-model="pubForm.title"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="cate_id">
              <el-select
                v-model="pubForm.cate_id"
                placeholder="请选择分类"
                style="width: 100%"
              >
                <el-option
                  :label="item.cate_name"
                  :value="item.id"
                  v-for="item in ArtcleList"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="btns">
              <el-button @click="operationFn('已发布')">发布</el-button>
              <el-button @click="operationFn('草稿')">存为草稿</el-button>
            </div>
          </div>
        </div>
        <el-form-item label="文章内容" prop="content">
          <!-- 使用 v-model 进行双向的数据绑定 -->
          <quill-editor
            v-model="pubForm.content"
            @change="contentChangeFn"
          ></quill-editor>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 文章详情对话框 -->
    <el-dialog title="文章预览" :visible.sync="detailVisible" class="detail" width="80%" top="20px">
        <h1>{{detailArtcle.title}}</h1>
        <div>
          <span>作者:{{detailArtcle.nickname || detailArtcle.username}}</span>
          <span>发布时间:{{$formatDate(detailArtcle.pub_date)}}</span>
          <span>所属分类:{{detailArtcle.cate_name}}</span>
          <span>状态:{{detailArtcle.state}}</span>
        </div>
        <el-divider></el-divider>
        <img :src="baseURL+detailArtcle.cover_img" alt="">
        <div v-html="detailArtcle.content" style="text-indent:2em"></div>
    </el-dialog>
  </div>
</template>

<script>
import { getArtcleData, uploadArticleAPI, getArtclesAPI,getArtcleDetailAPI,deleteArtcleAPI} from "@/api";
import coverImg from "@/assets/images/cover.jpg";
import {baseURL} from '@/utils/request'
export default {
  name: "artList",
  data() {
    return {
      baseURL : baseURL,
      //   控制发表文章对话框显示和隐藏
      dialogVisible: false,
      //  控制文章预览对话框显示和隐藏
      detailVisible:false,
      // 单个文章详情
      detailArtcle:{},
      // 主页查询的表单数据
      formData: {
        pagenum: 1, //当前页码数
        pagesize: 5, // 每页展示的条数
        cate_id: "", // 文章分类
        state: "", // 状态
      },
      // 所有文章列表数据
      artcles: {},
      pubForm: {
        // 新建文章的表单的数据对象
        title: "", //文章标题
        cate_id: "", //文章分类
        content: "", //文章内容
        cover_img: "", //文章封面
        state: "", //文章状态
      },
      // 表单的验证规则对象
      pubFormRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "文章标题的长度为1-30个字符",
            trigger: "blur",
          },
        ],
        cate_id: [
          { required: true, message: "请选择文章标题", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
      },
      // 文章分类数据
      ArtcleList: [],
    };
  },
  methods: {
    // 对话框关闭前的回调
    async handleClose(done) {
      // 询问用户是否确认关闭对话框
      const confirmResult = await this.$confirm(
        "此操作将导致文章信息丢失, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === "cancel") return;
      // 确认关闭
      done();
    },
    // 对话框关闭回调
    dialogCloseFn() {
      this.$refs.pubFormRef.resetFields();
      this.pubForm.cover_img = '';
      this.pubForm.content = "";
      this.$refs.coverImg.setAttribute("src", coverImg);
    },
    // 获取文章分类数据
    async getArtcleList() {
      const { data: res } = await getArtcleData();
      this.ArtcleList = res.data;
    },
    // 点击选择封面时
    selCover() {
      // 触发选择文件的点击事件
      this.$refs.cover.click()
    },
    // 更换封面时
    chooseCover(e) {
      const res = e.target.files;
      if (res.length === 0) {
        // 用户没有选择文件就使用默认的图片
        this.$refs.coverImg.setAttribute("src", coverImg);
      } else {
        this.pubForm.cover_img = res[0];
        const url = URL.createObjectURL(res[0]); //将图片转换成file文件格式
        this.$refs.coverImg.setAttribute("src", url); //更换页面的图片
      }
    },
    // 点击发布或草稿按钮时
    async operationFn(state) {
      // 1. 设置发布状态
      this.pubForm.state = state;
      // 2. 表单预校验
      this.$refs.pubFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请完善文章信息！");
        // 3. 判断是否提供了文章封面
        if (!this.pubForm.cover_img)
          return this.$message.error("请选择文章封面！");
        // 4. TODO：发布文章
        // 创建 FormData 对象
        const fd = new FormData();
        // 向 FormData 中追加数据
        Object.keys(this.pubForm).forEach((key) => {
          fd.append(key, this.pubForm[key]);
        });
        // 发起请求
        const { data: res } = await uploadArticleAPI(fd);
        if (res.code !== 0) return this.$message.error(res.message);
        this.$message.success("发布文章成功！");
        // 关闭对话框
        this.dialogVisible = false;
        // 重新请求刷新文章列表
        this.initArtcles();
        location.reload()
      });
    },
    // 手动监听富文本输入框
    contentChangeFn() {
      this.$refs.pubFormRef.validateField("content");
    },
    // 获取文章数据
    async initArtcles() {
      const { data: res } = await getArtclesAPI(this.formData);
      this.artcles = res;
    },
    // 每条页数改变时触发,sizes当前需要每页展示的条数
    handleSizeChange(sizes){
      this.formData.pagenum = 1
      this.initArtcles(this.formData)
    },
    // 当前页码改变时触发,nowpage 当前要看到的第几页
    handleCurrentChange(nowpage){
      this.initArtcles(this.formData)
    },
    // 筛选按钮点击事件
    filterFn(){
      // 使数据回到第一页五条数据
      this.formData.pagenum = 1
      this.formData.pagesize = 5
      this.initArtcles()
    },
    // 重置按钮点击事件
    resetFn(){
      this.formData.pagenum = 1
      this.formData.pagesize = 5
      this.formData.cate_id = ''
      this.formData.state = ''
      this.initArtcles()
    },
    //查询文章详情
    async artcleDetail(id){
        const {data:res} = await getArtcleDetailAPI(id)
        if(res.code !== 0) return this.$message.error(res.message)
        this.detailVisible = true
        this.detailArtcle = res.data
    },
    // 删除文章
    async deleteArtcle(id){
      const {data} = await deleteArtcleAPI(id)
      if(data.code !== 0 ) return this.$message.error(data.message)
      this.$message.success(data.message)
      if(this.artcles.data.length === 1){
        if(this.formData.pagenum > 1){
          this.formData.pagenum--
        }
      }
      this.initArtcles()
    }
  },
  created() {
    // 加载文章分类数据
    this.getArtcleList();
    // 加载文章数据
    this.initArtcles();
  },
};
</script>

<style scoped lang="less">
::v-deep .ql-editor {
  min-height: 240px;
}
.container {
  display: flex;
  justify-content: space-between;
  height: 40px;
}
.el-dialog {
  .el-form {
    .top {
      display: flex;
      justify-content: space-around;
      .right {
        width: 600px;
        position: relative;
        .btns {
          position: absolute;
          bottom: 35px;
          right: 0;
        }
      }
      .left {
        input {
          display: none;
        }
        img {
          cursor: pointer;
          width: 400px;
          height: 280px;
          overflow: hidden;
        }
      }
    }
  }
}
.detail{
  ::v-deep .el-dialog__body{
    padding: 0 10px 20px 10px;
  }
  h1{
    text-align: center;
    font-size:30px;
    font-weight: bold;
    margin: 0 0 10px 0;
  }
  span{
    margin-left: 10px;
  }
}
</style>