<template>








<div>

  <div>
    <div style="padding: 10px 0">
      <el-input type="textarea" v-model="commentForm.content"></el-input>
    </div>
    <div style="text-align: right">
      <el-button type="primary" @click="addComment(essayId)" size="small">评论</el-button>
    </div>
  </div>

  <div v-for="item in comments" :key="item.commentId" style="border-bottom:1px solid #94949b;padding: 10px 0 ">
    <div style="display: flex">
      <div style="margin-right: 10px">

        <el-image
            style="width: 35px; height: 35px;border-radius: 50%"
            :src="url"
            :fit="'fill'"></el-image>
      </div>
      <div style="flex: 1;font-size: 14px;padding: 5px 0;line-height: 25px">
        <div style="font-weight: bold">{{item.username}}</div>
        <div>{{item.content}}</div>

        <div style="display: flex;line-height: 20px;margin-top: 5px">
          <div style="width: 200px">
            <i class="el-icon-time"></i><span style="margin-left: 5px;color: #94949b;">{{item.time}}</span>
          </div>
          <div style="text-align: right;flex: 1">
            <el-button v-if="!item.showComment && item.children.length>0" type="text" style="margin-left: 10px;color: #94949b"
            @click="item.showComment=true">查看评论</el-button>
            <el-button v-if="item.showComment && item.children.length>0" type="text" style="margin-left: 10px;color: #94949b"
            @click="item.showComment=false">收起评论</el-button>
            <el-button style="margin-left: 10px" type="text" @click="handleReply(item.commentId)">回复</el-button>
            <el-button type="text" style="color: red" @click="del(item.commentId)" v-if="user.userId===item.userId">删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="item.showComment && item.children.length" style="padding-left: 20px">
      <div v-for="subItem in item.children" :key="subItem.commentId" style="background:rgb(240,240,240,0.3);padding: 5px 20px">
        <!--回复列表-->
        <div style="display: flex;font-size: 14px;padding: 5px 0;line-height: 25px">
          <div style="margin-right: 10px">
            <el-image
                style="width: 35px; height: 35px;border-radius: 50%"
                :src="url"
                :fit="'fill'"></el-image>
          </div>
          <div style="flex: 1">
            <b v-if="subItem.pname" style="color: #94949b">{{subItem.username}}&nbsp;回复&nbsp;<span style="color: #3a8ee6">@{{subItem.pname}}</span></b>
            <div style="padding-left: 5px">
              <b>{{subItem.username}}</b>
              <span>{{subItem.content}}</span>
            </div>
            <div style="display: flex;line-height: 20px;margin-top: 5px;padding-left: 5px">
              <div style="width: 200px">
                <i class="el-icon-time"></i><span style="margin-left: 5px;color: #94949b">{{subItem.time}}</span>
              </div>
              <div style="text-align: right;flex: 1">
                <el-button style="margin-left: 5px" type="text" @click="handleReply(subItem.commentId)">回复</el-button>
                <el-button type="text" style="color: red" @click="del(subItem.commentId)" v-if="user.userId===subItem.userId">删除</el-button>
              </div>
            </div>
          </div>




        </div>


      </div>
    </div>



  </div>


  <el-dialog
      title="回复"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
    <el-input v-model="commentForm.replyContent" type="textarea"></el-input>
    <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addReply">确 定</el-button>
  </span>
  </el-dialog>



</div>

</template>

<script>
import request from "@/utils/request";
import {alertMessage} from "@/utils";

export default {
  name: "Comment",
  data(){
    return{
      url:require('../image/img1.png'),
      user:{

      },
      commentForm:{
        pid:'',
        content:'',
        replyContent:''
      },
      centerDialogVisible:false,

    }
  },
  props:{
    comments:{
      type:Array
    },
    essayId:{
      type:Number
    }

  },
  methods:{
    handleReply(commentId){
      this.commentForm.pid=commentId;
      this.centerDialogVisible=true;
    },
    del(commentId){
      request.delete('/comment/'+commentId).then(res=>{
        if(res.code===0){
          alertMessage("删除成功！","success");
        }else {
          alertMessage("删除失败。","error");
        }
      })
    },
    addComment(essayId){
      let data={
        essayId:essayId,
        parentCommentId:null,
        content:this.commentForm.content
      }
        request.post('/comment',data).then(res=>{
          if(res.code===0){
            alertMessage("评论成功！","success");
          }else {
            alertMessage("评论失败。","error");
          }
        })
    },
    addReply(){
      this.centerDialogVisible=false;
      let data={
        essayId:this.essayId,
        parentCommentId:this.commentForm.pid,
        content:this.commentForm.replyContent

      }
      request.post('/comment',data).then(res=>{
          if(res.code===0){
            alertMessage("回复成功！","success");
          }else {
            alertMessage("回复失败。","error");
          }
      })
    }

  },

}
</script>

<style scoped>

</style>