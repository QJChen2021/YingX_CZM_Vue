<template>
  <div>
    <el-image src="C:\Users\saunt\AppData\Local\Temp\tomcat-docbase.8000.5093351209382558261\7fe7d2c9166c4d6f8145a18ef499c47b.jpg"></el-image>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="head_img"
        label="头像">
        <template slot-scope="scope">
          <el-image :src="scope.row.head_img" style="height: 50px"></el-image>
        </template>
      </el-table-column>

      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>

      <el-table-column
        prop="brief"
        label="描述">
      </el-table-column>


      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1" @click="aa(0,scope.row.id)">冻结</el-button>
          <el-button type="primary" v-else @click="aa(1,scope.row.id)">可用</el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="create_date"
        label="注册时间">
      </el-table-column>


      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteuser(scope.row.id)">删除</el-button>
          <!--        {{aa(scope.row.status)+scope.$index}}-->
        </template>
      </el-table-column>

    </el-table>
    <el-button round type="primary" @click="dialogVisible=true">添加用户</el-button>
    <el-button round type="primary" @click="expportData">导出数据</el-button>
    <br>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="号码">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.brief"></el-input>
        </el-form-item>
        <b>选择头像</b>
        <!--    this.$refs.photo.files[0])    -->
        <input type="file" id="touxiang" name="photo" ref="photo"/>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>


    <b>当前第：{{page}}页</b>
<!--        <el-button @click= "shang(page-1)">上一页</el-button>-->
<!--        <el-button @click="xia(page+1)" >下一页</el-button>-->
    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left" @click= "shang(page-1)">上一页</el-button>
      <el-button type="primary" @click="xia(page+1)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
    <b>共{{ pagenum }}页</b>
  </div>
</template>


<script>

import instance from "../../utils/request";

export default {
  name: "List",

  data() {
    return {
      tableData: [],//用户数据
      page: 1,  //当前页
      pagenum: 0,  //总页
      disable: "",
      dialogVisible: false,  //隐藏
      form: {  //存储的是添加的用户名  手机号  简介
        username: '',
        phone: '',
        brief: '',
      }
    }
  },
  methods: {
    findAll(){
      instance.get("/user/findAll?page="+this.page)
        .then(req => {
          // console.log(req.data);
          this.page = req.data.page;
          this.pagenum = req.data.pagenum;
          this.tableData = req.data.tableData;
        })
    },
    deleteuser(id) {
      instance.get("/user/delete?id="+id)
        .then(req => {
          this.querypage(this.page);
          this.dialogVisible = false;
        })
    },

    add() {
      // console.log(this.form);
      // console.log("头像：", this.$refs.photo.files[0]);

      //  添加  user 对象

      let formData = new FormData()
      formData.append("photo", this.$refs.photo.files[0])
      formData.append("username", this.form.username);
      formData.append("phone", this.form.phone);
      formData.append("brief", this.form.brief);

      instance.post("/user/add", formData)
        .then(req => {
          this.querypage(this.page);
          this.dialogVisible = false;

      this.form={};
      document.getElementById("touxiang").value='';

        })


    },


    aa(number, id) {
      // console.log(number);

      instance.get("/user/updateStatus?id=" + id + "&number=" + number)
        .then(req => {
          this.querypage(this.page);
        })

    },
    querypage(page) {
      // console.log(page)
      instance.get("/user/findAll?page=" + page)
        .then(req => {
          // console.log(req.data);
          this.page = req.data.page;
          this.pagenum = req.data.pagenum;
          this.tableData = req.data.tableData;
        })
    },
    xia(page) {
      if(this.page == this.pagenum){
          this.$message({
            message:"已经是最后一页了",
            center:true,
            type:"success"
          });
          return false;
      }
      this.querypage(page);
    },
    shang(page) {
      if(this.page == 1){
        this.$message({
          message:"已经是第一页了",
          center:true,
          type:"success"
        });
        return false;
      }
      this.querypage(page);
      },
    expportData(){
      instance.get("user/expportData?page="+this.page)
        .then(req=>{

        })
    }
  },
  created() {
    this.findAll();
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
