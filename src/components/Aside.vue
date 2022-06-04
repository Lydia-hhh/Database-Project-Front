<template>
<div>

      <el-menu
          :default-active="index"
          class="el-menu-vertical-demo"
          style="width: 200px;min-height: calc(100vh - 50px);height: 100%"
          background-color="#313132"
          text-color="white"
          active-text-color="#ffd04b"
          :router="true"
      >
        <div style="height: 40px;margin-top: 20px;text-align: center">
            <span style="height: 30px;line-height: 30px;color:white;font-weight: bold">论 文 管 理</span>
        </div>
        <div style="height: 20px"></div>


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



      </el-menu>


</div>
</template>

<script>




export default {
  name: "Aside",
  components:{

  },
  data(){
    return{
      index:'/',
    }
  },
  methods:{

  },
  mounted() {
    this.index=this.$route.path;
  },

}

</script>

<style scoped>

</style>