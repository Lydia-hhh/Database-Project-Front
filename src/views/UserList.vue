<template>
<div :style="conTop">
  <div style="width: 90%;margin-left: 5%;height: 95%;margin-top:2.5%;background: rgb(255,255,255,0.7)">
    <div style="height: 10px"></div>
    <div style="height: 700px">
      <el-scrollbar style="height: 100%;overflow-x: hidden;">
        <el-card v-for="(item,index) in users" class="box-card" style="width: 80%;margin-left: 10%;height: 130px;margin-top: 10px">
          <div style="margin-left: 15%">
            <div style="margin-top: 10px">
              <div style="display: inline-block;width: 60%"><span style="color: #8c939d;font-weight: bold">用户名：</span>{{item.username}}</div>
              <div style="display: inline-block;width: 40%"><span style="color: #8c939d;font-weight: bold">真实姓名：</span>{{item.realName}}</div>
            </div>
            <div style="height: 20px"></div>
            <div>
              <div style="display: inline-block;width: 60%"><span style="color: #8c939d;font-weight: bold">邮箱：</span>{{item.email}}</div>
              <div style="display: inline-block;width: 40%"><el-button type="danger" plain style="width: 150px" size="mini">删除</el-button></div>
            </div>
          </div>

        </el-card>

      </el-scrollbar>

    </div>

    <!--分页-->
    <div style="width: 60%;margin-left: 30%">
      <el-pagination style="margin: 0 auto"
                     :current-page.sync="pageNum"
                     layout="prev, pager, next, jumper"
                     :total="1000"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
      />
    </div>
    <!--分页-->

    <div style="height: 10px"></div>
  </div>

</div>


</template>

<script>
import request from "@/utils/request";

export default {
  name: "UserList",
  data(){
    return{
      conTop:{
        background:"url("+require("../image/bg11.jpg"),
        backgroundSize:"cover"
      },
      pageNum:1,
      users:[
        {
          "userId":3,
          "username":"rose",
          "realName":"xiaohong",
          "email":"happy@123.com",
          "role":"S"
        },
        {
          "userId":3,
          "username":"rose",
          "realName":"xiaohong",
          "email":"happy@123.com",
          "role":"S"
        }
      ]

    }
  },
  methods:{
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    getUsers(){
      request.get('/manage',{
        params:{
          username:'',
          role:'',
          deleted:false,
          userId:'',
          pageNum:this.pageNum
        }
      }).then(res=>{
        if(res.code===0){
          this.users=res.data
        }else {
          this.$message({
            type:'error',
            message:res.msg
          })
        }
      })

    }
  },
  created() {
    this.getUsers();
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>