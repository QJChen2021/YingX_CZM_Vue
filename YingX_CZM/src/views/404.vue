<template>
  <div>
    <h1>404 页面丢失</h1>
    <h2><router-link to="/indexs/zy">点击回到主页</router-link></h2>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>
h1{
  font-size: 48px;
}
a{
  text-decoration: none;
  color: #2C3E50;
}
</style>
