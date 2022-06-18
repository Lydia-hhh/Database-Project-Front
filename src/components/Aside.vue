<template>
<div>

      <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          style="width: 100%;text-align: center"
          background-color="#444444"
          text-color="white"
          active-text-color="#ffd04b"
          mode="horizontal"
      >

          <el-menu-item index="/user/usercenter" >
            <i class="el-icon-s-home"></i>
            <span>用户中心</span>
          </el-menu-item>



          <el-menu-item index="/user/searchthesis">
            <i class="el-icon-search"></i>
            <span>查找论文</span>
          </el-menu-item>



          <el-menu-item index="/user/addthesis">
            <i class="el-icon-document"></i>
            <span>新增笔记</span>
          </el-menu-item>




          <el-menu-item index="/user/mynotes">
            <i class="el-icon-notebook-2"></i>
            <span>我的笔记</span>
          </el-menu-item>

        <div style="color: white;text-align: right;margin-right: 20px;line-height: 60px">
          <el-dropdown trigger="click">
            <el-button type="text" class="el-dropdown-link" style="color: white">
              其他<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
              <el-button type="text" @click="logOut">退出</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-menu>




</div>
</template>

<script>




import request from "@/utils/request";
import {alertMessage} from "@/utils";

export default {
  name: "Aside",
  components:{

  },
  data(){
    return{
      centerDialogVisible:false,
      form:{
        oldPwd:'',
        newPwd:'',
        confirmPwd:''
      }
    }
  },
  methods:{
    logOut(){
      // request.post("/user/logout").then(res=>{
      //   if(res.code===0){
      //     alertMessage("退出成功！","success");
      //     this.$router.push("/");
      //   }else {
      //     alertMessage("退出失败。","error");
      //   }
      // })
      this.$router.push("/");
    }

  },
  mounted() {
    this.index=this.$route.path;
  },

}

</script>

<style scoped>

</style>