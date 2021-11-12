<template>
  <div id="main">

  </div>
</template>

<script>
import * as echarts from 'echarts';
import instance from "../../utils/request";
export default {
  name: "UserEcharts",
  data(){
    return {
      month: [],
      manCount: [],
      womenCount: []
    }
  },
  methods:{
    findEcharts(){
      instance.get("user/userEcharts")
        .then(req=>{
          this.month = req.data.month;
          this.manCount = req.data.manCount;
          this.womenCount = req.data.womenCount

          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
          myChart.setOption({
            title: {
              text: '用户注册分析图',
              left: 'left'
            },
            legend: {
              data: ["男生注册人数","女生注册人数"]
            },
            tooltip: {}, //鼠标悬浮于柱形图上提示信息
            xAxis: {
              data: this.month
            },
            yAxis: {},
            series: [
              {
                name: '男生注册人数',
                type: 'bar', //bar表示柱形图
                data: this.manCount
              },
              {
                name: '女生注册人数',
                type: 'bar', //bar表示柱形图
                data: this.womenCount
              }
            ]
          });
        })
    }
  },
  created() {
    this.findEcharts();
  }
}
</script>

<style scoped>
  #main{
    width: 100%;
    height: 600px;
  }
</style>
