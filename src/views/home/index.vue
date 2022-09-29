<template>
  <div class="container">
    <!-- 第一行 -->
    <el-row :gutter="10" class="row1">
      <el-col :xs="12" :sm="6" v-for="item in row1" :key="item.b">
        <el-card :body-style="{ padding: '0' }" :class="item.class">
          <em>{{ item.num }}</em
          ><span>{{ item.span }}</span>
          <b>{{ item.b }}</b>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <el-row :gutter="10" class="row2">
      <el-col :span="16">
        <el-card :body-style="{ padding: '0' }">
            <CurveChart/>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0' }">
            <PieChart></PieChart>
        </el-card>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row class="row3">
      <el-col :span="24">
        <el-card :body-style="{ padding: '0' }">
            <ColumnChart></ColumnChart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入面积图组件
import CurveChart from './echarts/CurveChart.vue'
// 引入饼图组件
import PieChart from './echarts/PieChart.vue'
// 引入柱状图组件
import ColumnChart from './echarts/ColumnChart.vue';
export default {
  name: "HomeView",
  components:{
    CurveChart,
    PieChart,
    ColumnChart
},
  data() {
    return {
      row1: [
        {
          num: 10015,
          span: "篇",
          b: "总文章数",
          class: "part1",
        },
        {
          num: 123,
          span: "篇",
          b: "日新增文章数",
          class: "part2",
        },
        {
          num: 35,
          span: "条",
          b: "评论总数",
          class: "part3",
        },
        {
          num: 123,
          span: "条",
          b: "日新增评论数",
          class: "part4",
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
.container {
  .row1 {
    .el-card {
      height: 80px;
      position: relative;
      text-align: center;
      padding: 0;
      em {
        line-height: 60px;
        font-size: 40px;
        margin-right: 5px;
      }

      b {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 20px;
        background-color: gray;
        color: white;
      }
    }
    .part1 {
      em,
      span {
        color: #83a2ed;
      }
    }
    .part2 {
      em,
      span {
        color: #6ac6e2;
      }
    }
    .part3 {
      em,
      span {
        color: #5fd9de;
      }
    }
    .part4 {
      em,
      span {
        color: #58d88e;
      }
    }
  }
  .row2 {
    margin-top: 10px;
    div{
        height:300px;
    }
  }
  .row3 {
    margin-top: 10px;
    .el-card {
      div{
          height:305px;
      }
    }
  }
}
</style>