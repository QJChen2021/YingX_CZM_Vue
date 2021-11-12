<template>
  <div>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in imgs" :key="item">
        <el-image :src="item" class="medium"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Images from "../assets/images/1.jpg"
import Images2 from "../assets/images/2.jpg"
import Images3 from "../assets/images/3.jpg"
export default {
  name: "index",
  data(){
    return{
      imgs:[Images,Images2,Images3]
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
