<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>

import Header from "./components/Header";
import Aside from "./components/Aside";
export default {
  name:"Layout",
  components:{
    Aside,
    Header
  },
  data(){
    return{
      conTop:{
        backgroundImage:"url("+require("./image/databg1.jpg"),
      }
    }
  }
}
</script>
<style lang="scss">
#app{
margin-top: 0;
background-color: white;
}

.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
// 上面隐藏横向滚动条会导致下拉框底部遮盖问题
.el-select-dropdown .el-scrollbar {
  padding-bottom: 17px;
}

</style>
