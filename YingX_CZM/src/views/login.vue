<template>
  <div class="login-container">
    <el-form :model="ruleForm2" :rules="rules2"
             status-icon
             ref="ruleForm2"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username" >
        <el-input type="text"
                  @keyup.enter="handleSubmit()"
                  v-model="ruleForm2.username"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" @keyup.enter="handleSubmit()">
        <el-input type="password"
                  @keyup.enter="handleSubmit()"
                  v-model="ruleForm2.password"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import instance from "../utils/request";

export default {
  data(){
    return {
      ruleForm2: {
        username: '',
        password: '',
      },
      rules2: {
        username: [{required: true, message: '请输入你的账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入你的密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleSubmit(event){
      this.$refs.ruleForm2.validate((valid) => {
        //用户名
        // console.log(this.ruleForm2.username);
        //密码
        // console.log(this.ruleForm2.password);

        //发送异步请求
        instance.post("/admin/login",this.ruleForm2).then(
          res=>{
            // console.log(res.data);
            if(res.data.state == 'success'){
              localStorage.setItem("username",res.data.username);
              this.$router.push('/indexs/zy');
            }else{
              //登录失败  弹出消息   用户名错误   |  密码错误   message  status:true 跳转页面   false展示消息
              if(res.data.msg=='密码错误'){
                this.ruleForm2.password=''
              }else{
                this.ruleForm2=''
              }
              this.rules2.password= [{required: true, message: res.data.msg}]
            }
          }
        );
        //登录一定保存用户信息
      })
    }
  }
};
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  box-shadow: 0 0 25px #e7e5e5;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>

