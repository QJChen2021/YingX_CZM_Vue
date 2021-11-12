<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246);width: 250px">
<!--      <el-menu v-for="item in menuData" @open="aa(item.id)">-->
<!--        <el-submenu align="left" :index="item.id">-->
<!--          <template slot="title">-->
            <div v-for="item in menuData" style="margin-bottom: 20px;margin-top: 10px">
            <i @click.stop="addParentId(item.id)" class="el-icon-circle-plus-outline"></i>
            &nbsp;&nbsp;
            <el-button plain style="width: 150px" type="success" @click="aa(item.id)">{{ item.cateName }}</el-button>
              <p></p>
              <el-button type="danger" icon="el-icon-delete" @click="deleteById(item.id)" circle></el-button>
            </div>
        <div style="margin-bottom: 20px;margin-top: 10px">
          <el-button plain style="width: 150px" type="success" round @click="addLevels()">添加1级</el-button>
        </div>

    </el-aside>

    <el-container>
      <el-main>
        <el-table :data="menu2Data">

          <el-table-column prop="id" label="id">
          </el-table-column>

          <el-table-column prop="cateName" label="类别">
          </el-table-column>

          <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="deleteByParentId(scope.row.id,scope.row.parentId)">删除</el-button>
              <el-button type="danger" @click="updateByParentId(scope.row.id,scope.row.parentId)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import instance from "../../utils/request";

export default {
  name: "lb",
  data() {
    const item = {
      date: '',
      name: '',
      address: ''
    };
    return {
      tableData: [],
      menuData: [],
      menu2Data: []
    }
  },
  created() {
    instance.get("/category/queryByLevels?levels=1")
      .then(req => {
        instance.get("/category/queryByParent?parentId=1")
          .then(req => {
            this.menu2Data = req.data;
          })
        this.menuData = req.data;
      })
  },
  methods: {
    deleteByParentId(id,parentId) {
      instance.get("/category/deleteByParentId?id="+id)
        .then(req =>{
          instance.get("/category/queryByParent?parentId="+parentId)
            .then(req => {
              this.menu2Data = req.data;
            })
        })
    },

    updateByParentId(id,parentId){
      const b = window.prompt("请输入修改名");
      if (b == null) return false;
      instance.get("/category/updateByParentId?id="+id+"&cateName="+b)
        .then(req =>{
          instance.get("/category/queryByParent?parentId="+parentId)
            .then(req => {
              this.menu2Data = req.data;
            })
        })
    },

    addLevels(){
      const name = window.prompt("请输入添加名");
      instance.post("/category/insertLevels",{cateName:name,levels: 1})
        .then(res=>{
          instance.get("/category/queryByLevels?levels=1")
            .then(req => {
              this.menuData = req.data;
            })
        })
    },

    aa(id) {
      instance.get("/category/queryByParent?parentId=" + id)
        .then(req => {
          this.menu2Data = req.data;
        })
    },

    addParentId(id) {
      const b = window.prompt("请输入添加的类别");
      if (b == null) return false;
      instance.post("/category/insertCategory", {cateName: b, levels: 2,parentId:id})
        .then(req => {
          instance.get("/category/queryByParent?parentId=" + id)
            .then(req => {
              this.menu2Data = req.data;
            })
        })
    },
    deleteById(id) {
      instance.get("/category/queryByParent?parentId=" + id)
        .then(req => {
          this.menu2Data = req.data;
          if(this.menu2Data.length == 0){
            instance.get("/category/deleteLevels?id=" + id)
              .then(req => {
                this.$message({
                  message:"删除成功",
                  center:true,
                  type:"success"
                });
                instance.get("/category/queryByLevels?levels=1")
                  .then(req => {
                    this.menu2Data = req.data;
                  })
              })
          }else{
            this.$message({
              message:"内有二级类别无法删除",
              center:true,
              type:"error"
            });
            return false;
          }


        })

    }
  }
};
</script>



