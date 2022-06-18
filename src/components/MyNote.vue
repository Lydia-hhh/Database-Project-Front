<template>
<div style="margin-top: 20px">

  <div class="card">
    <div style="margin-left: 10px;padding: 10px">
      <div style="font-weight: bold;font-size: 20px">{{item.title}}</div>
      <div style="height: 10px"></div>
      <div style="font-size: small;color: #8c939d">
        <div style="display: inline-block;width: 70%">{{item.author}}</div>
        <div style="width: 30%;display: inline-block">上传时间：{{item.createTime}}</div>
      </div>
      <div style="height: 10px"></div>
      <div>
        <div style="display: inline-block;width: 70%">
          <el-button size="mini" @click="toNoteDetail(item)">查看详情</el-button>
        </div>

        <div style="display: inline-block;width: 30%">
          <el-button size="mini" @click="showData(item)">查看数据</el-button>
          <el-button size="mini" style="margin-left: 10px" type="danger" @click="deleteNote(item.essayId)">删除</el-button>
        </div>

      </div>
    </div>

  </div>


    <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :close="handleClose"
        size="80%"
    >
      <div   id="showGraph">
        <div style="height: 20px"></div>
      <div style="width: 90%;margin-left: 5%;background-color: white">
        <div style="margin-left: 10px;">
          <div style="height: 10px"></div>
          <div style="font-weight: bold">论文标题：<span class="thesis-info">{{thesisInfo.title}}</span></div>
          <div style="height: 10px"></div>
          <div style="font-weight: bold">论文类型：<span class="thesis-info">{{thesisInfo.essayType}}</span></div>
          <div style="height: 10px"></div>
          <div style="font-weight: bold">作者：<span class="thesis-info">{{thesisInfo.author}}</span></div>
          <div style="height: 10px"></div>
          <div style="font-weight: bold">发布人：<span class="thesis-info">{{thesisInfo.username}}</span></div>
          <div style="height: 10px"></div>
          <div style="font-weight: bold">会议：<span class="thesis-info">{{thesisInfo.conference}}</span></div>
          <div style="height: 10px"></div>

        </div>

      </div>

      </div>
    </el-drawer>



</div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "MyNote",
  props:{
    item:{
      type:Object,
    }
  },
  data(){
    return{
      id:null,
      drawer:false,
      direction:'rtl',
      thesisInfo:{
      }
    }

  },
  methods:{
    showData(item){
      this.thesisInfo=item;
      console.log(this.thesisInfo)
      this.drawer=true;
    },
    handleClose(){
      this.drawer=false;
    },
    toNoteDetail(item){//"/user/editthesis"
      this.$router.push({
        name:'UserEditThesis',
        params:{
          essayId:item.essayId,
          from:'我的笔记'
        }
      });
    },
    deleteNote(essayId){
      request.delete("/essay/"+essayId).then(res=>{
        if(res.code===0){
          console.log("删除成功！")
        }else {
          console.log("删除失败！")
        }

      })
    },
  },

  mounted() {

  }
}
</script>

<style scoped>
/* From uiverse.io by @Sujitkavaiya */
.card {
  width: 95%;
  background: rgb(255, 255, 255);
  border-radius: 0.4em;
  box-shadow: 0.3em 0.3em 0.7em #00000015;
  transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: rgb(250, 250, 250) 0.2em solid;
}

.card:hover {
  border: #444444 0.2em solid;
}
.card:active{
  border: white 0.2em solid;
}
#showGraph{
  background-color: #F5F5F7;
  width: 100%;
  height: 100%;
}
.thesis-info{
  font-weight: normal;
}
</style>