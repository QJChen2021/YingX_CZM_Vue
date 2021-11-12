<template>

  <div>

    <el-button type="primary" @click="dialogVisible=true" >添加视频</el-button>
    <el-table :data="tableData" border>

      <el-table-column prop="id" label="id">
      </el-table-column>

      <el-table-column prop="title" label="标题">
      </el-table-column>

      <el-table-column prop="videoPath" label="视频">
        <template slot-scope="scope">
        <video style="height: 350px" :src="scope.row.videoPath" controls/>
        </template>
      </el-table-column>

      <el-table-column prop="createDate" label="上传时间">
      </el-table-column>

      <el-table-column prop="brief" label="描述">
      </el-table-column>

      <el-table-column prop="categoryId.cateName" label="所属类别">
      </el-table-column>

      <el-table-column prop="userId.username" label="所属用户名">
      </el-table-column>


      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteByVideo(scope.row.id,scope.row.coverPath,scope.row.videoPath)">删除</el-button>
          <el-button type="danger">修改</el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-dialog title="添加视频" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="一级类别">

          <el-select v-model="value" placeholder="请选择" @change="change()">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="二级类别">

          <el-select v-model="value2" placeholder="请选择" @change="change()">
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="brief"></el-input>
        </el-form-item>

        <b>选择视频</b>
        <input type="file" id="video" name="video" ref="video"/>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
    <hr>
    <p><b>当前第：{{page}}页</b></p>
    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left" @click= "shang(page-1)">上一页</el-button>
      <el-button type="primary" @click="xia(page+1)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
    <p><b>共{{ pagenum }}页</b></p>

  </div>


</template>

<script>
import instance from "../../utils/request";

export default {
name: "Video",
  data() {
    return {
      tableData: [],
      dialogVisible: false,  //隐藏
      title:'',
      brief:'',
      page: 1,  //当前页
      pagenum: 0,  //总页
      options: [],
      options2: [],
      value: '',  //下拉框改变时存储的1级类别id
      value2:''   //下拉框改变时存储的2级类别id    添加视频传2级类别
    }
  },

  methods:{
    findAll(){
      instance.get("/video/findAll?page="+this.page)
        .then(req => {
          this.page = req.data.page;
          this.pagenum = req.data.pagenum;
          this.tableData = req.data.tableData;
          console.log(req.data.tableData)
        })

    },
    deleteByVideo(id,coverPath,videoPath){
      let formData = new FormData()
      formData.append("id",id)
      formData.append("coverPath",coverPath)
      formData.append("videoPath",videoPath)
      instance.post("/video/deleteByVideo",formData)
        .then(req=>{
          this.findAll()
        })
    },
    change(){
      instance.get("/video/findLevels2?levels="+this.value)
        .then(req=>{
          this.options2 = req.data
        })
      console.log("一级标签："+this.value)
      console.log("二级标签："+this.value2)
      //下拉框改变时存储的1级类别id
      //拿着这个id查询它下边所有的二级类别
    },
    add(){
      console.log(this.title);
      console.log(this.brief);

      let formData = new FormData()
      formData.append("categoryId",this.value2 )
      formData.append("video", this.$refs.video.files[0])
      formData.append("title", this.title);
      formData.append("brief", this.brief);

      instance.post("/video/add", formData)
        .then(req => {
          this.dialogVisible = false;
          this.title='';
          this.brief='';
          document.getElementById("video").value='';

          this.findAll();

        })
    },
    xia(page) {
      if(this.page == this.pagenum){
        this.$message({
          message:"已经是最后一页了",
          center:true,
          type:"error"
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
          type:"error"
        });
        return false;
      }
      this.querypage(page);
    },
    querypage(page) {
      instance.get("/video/findAll?page=" + page)
        .then(req => {
          this.page = req.data.page;
          this.pagenum = req.data.pagenum;
          this.tableData = req.data.tableData;
        })
    },
  },
  created() {
    this.findAll();
    instance.get("/video/findLevels?levels=1")
      .then(req=>{
        this.options = req.data
      })
  }
}

</script>

<style scoped>

</style>
