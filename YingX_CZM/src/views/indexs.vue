<template>

  <div>
    <h1>欢迎进入后台管理系统</h1>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" >主页</el-menu-item>
      <el-menu-item index="2">用户管理</el-menu-item>
      <el-menu-item index="3">类别管理</el-menu-item>
      <el-menu-item index="4">视频管理</el-menu-item>
      <el-menu-item index="5">用户分析</el-menu-item>
      <el-menu-item index="6">2101class聊天室</el-menu-item>
      <el-menu-item index="7">欢迎: {{ username }}</el-menu-item>
      <el-menu-item index="8"><el-button size="mini" type="primary" >退出登陆</el-button></el-menu-item>

    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "Index",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      username:localStorage.getItem("username")
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.$router.push({path: '/indexs/zy'});
      } else if (key == 2) {
        this.$router.push({path: '/indexs/list'});
      } else if (key == 3) {
        this.$router.push({path: '/indexs/lb'});
      } else if (key == 4) {
        this.$router.push({path: '/indexs/video'});
      }  else if (key == 5) {
        this.$router.push({path: '/indexs/UserEcharts'});
      } else if (key == 6) {
        this.$router.push({path: '/indexs/UserEcharts'});
      } else if (key == 7) {
        this.$router.push({path: '/indexs/username'})
      } else if (key == 8) {
        localStorage.removeItem("username");
        this.$router.push({path: '/'});
      }
    }
  }
}
</script>
