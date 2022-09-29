<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <span>文章分类</span>
        <el-button @click="dialogVisible = true;add = true">添加分类</el-button>
      </div>
      <el-table style="width: 100%" border stripe :data="tableData">
        <el-table-column
          label="序号"
          width="100"
          type="index"
        ></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="ediot(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="mini" @click="deleteFn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加分类duihuakuang -->
      <el-dialog
        :visible.sync="dialogVisible"
        title="添加文章分类"
        @closed="closeFn"
      >
        <el-form label-width="100px" :model="cate" :rules="rules" ref="form">
          <el-form-item label="文章分类" prop="cate_name">
            <el-input type="text" v-model="cate.cate_name"></el-input>
          </el-form-item>
          <el-form-item label="分类别名" prop="cate_alias">
            <el-input type="text" v-model="cate.cate_alias"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="done">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 获取文章分类接口,添加新分类接口，保存分类修改信息接口
import {getArtcleData, addArtcle, updateArtcle,delArtCateAPI} from "@/api";
export default {
  name: "artCate",
  data() {
    return {
      // 识别当前操作是新增分类还是编辑分类  true为新增 false为修改
      add: Boolean,
      // 文章分类数据
      tableData: [],
      // 显示隐藏对话框
      dialogVisible: false,
      // 添加分类的数据
      cate: {
        id: Number,
        cate_name: "", //文章分类
        cate_alias: "", //分类别名
      },
      // 输入框校验
      rules: {
        cate_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "名称只能是1-10位非空字符",
            trigger: "blur",
          },
        ],
        cate_alias: [
          { required: true, message: "请输入分类别名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: "分类别名必须是1-15位的字母数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getArtcle();
  },
  methods: {
    // 调用接口获取文章分类接口，获取数据赋值给tableData，进行页面渲染
    async getArtcle() {
      const { data: res } = await getArtcleData();
      if (res.code !== 0) return this.$message.error(res.message);
      this.tableData = res.data;
    },
    // 关闭对话框时
    closeFn() {
      // 清除输入框数据
      this.$refs.form.resetFields();
    },
    // 向服务器保存新增分类数据或修改分类数据，参数放置修改或新增接口即可
    async operation(kind) {
      const { data: res } = await kind(this.cate);
      if (res.code !== 0) return this.$message.error(res.message);
      this.$message.success(res.message);
      this.getArtcle();
    },
    // 对话框点击确定时触发
    done() {
       this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 如果add为true则执行新增
          if (this.add) return this.operation(addArtcle)
          // add为false则执行修改
         this.operation(updateArtcle)
         this.dialogVisible = false;
        } else return this.$message.error('输入不符合格式');
      });
    },
    //删除某分类时
    async deleteFn(data) {
      const {data:res} = await delArtCateAPI(data.id)
      if(res.code !==0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getArtcle()
    },
    // 修改某分类时
    ediot(data) {
      this.add = false
      const { id, cate_name, cate_alias } = data;
      this.cate.cate_name = cate_name;
      this.cate.cate_alias = cate_alias;
      this.cate.id = id;
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: block;
    font: 30px bold;
  }
}
</style>
