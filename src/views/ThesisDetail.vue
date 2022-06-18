<template>

  <div :style="conTop">
    <div style="width: 90%;margin: 0 5%; ">
      <div style="height: 40px"></div>
      <div class="card">
        <div class="card__content" style="padding-left: 10px;padding-right: 10px">
          <div style="height: 5px"></div>
                    <div style="font-weight: bold;margin-top: 10px;">标题：{{thesisContent.title}}</div>
                    <div style="height: 10px"></div>
                    <div style=";color: #8c939d">
                      <div style="display: inline-block;width: 25%">作者：{{thesisContent.author}}</div>
                      <div style="display: inline-block;width: 25%">会议：{{thesisContent.conference}}</div>
                      <div style="display: inline-block;width: 25%">出版时间：{{thesisContent.publishDate}}</div>
                      <div style="display: inline-block;width: 25% ">论文类型：{{thesisContent.essayType}}</div>
                    </div>
                    <div style="height: 10px"></div>
                    <div><span style="font-weight: bold">摘要：</span>{{thesisContent.digest}}</div>
                    <div style="margin-top: 10px;color: #606266">原文链接：{{thesisContent.essayLink}}</div>
                    <div  style="margin-top: 10px;color:  #8c939d">

                      引用论文链接：

                      <span  v-for="(item,index) in thesisContent.references">{{item.title}}&emsp;</span>

                    </div>
                    <div style="height: 10px"></div>
                    <div style="color: #8c939d">
                      <div style="width: 50%;display: inline-block">上传用户：{{thesisContent.username}}</div>
                      <div style="width: 50%;display: inline-block">上传时间：{{thesisContent.createTime}}</div>
                    </div>
                    <div style="height: 10px"></div>
        </div>
      </div>

      <!--笔记内容-->
      <div id="note-content">
        <el-scrollbar  style="height: 100%">
          <p>
            {{thesisContent.content}}
          </p>
        </el-scrollbar>

      </div>
      <!--笔记内容-->
      <div style="height: 2px"></div>
      <div>

        <div style="display: inline-block;width: 90%">
          <button id="edit-btn" v-if="isEdit">
            <span>编辑</span>
          </button>
        </div>

        <div style="display: inline-block;width:10%">
          <button id="find_file"> 查看附件
          </button>
        </div>
      </div>


      <!--评论区-->
      <div style="height: 10px"></div>
      <el-divider></el-divider>
      <div>
        <div style=";font-size: small;font-weight: bold">
          <span>评 论 区</span>
        </div>
        <Comment :comments="comments"></Comment>
      </div>


    </div>

  </div>


</template>

<script>
import CommentAdd from '../components/CommentAdd.vue'
import CommentList from '../components/CommentList.vue'
import Comment from "@/components/Comment";
import request from "@/utils/request";

export default {
  name: "ThesisDetail",
  components:{
    Comment,
    CommentAdd,
    CommentList
  },
  data(){
    return{
      conTop:{
        background:"url("+require("../image/bg11.jpg"),
        backgroundSize:"cover"
      },
      isEdit:false,
      thesisContent:{
        essayId:3,
        title:"关于数据库的第三篇论文",
        author:"王五",
        conference:"ACM",
        publishDate:"2015-02-12 00:00:00",
        essayType:"工具型",
        digest:"又是摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要...",
        essayLink:"www.alibaba.com",
        username:"rose",
        createTime:"2022-04-26 16:34:20",
        references:[
          {
            essay_id:1,
            title:"数据库的一篇论文"
          },
          {
            essay_id:2,
            title:"数据库的第二篇论文"
          }
        ],
        content:"aaabbcc",
        attachment:"xyxyxy"
      },
      comments:[
        {
          commentId: 6,
          content: "评论test评论test评论test评论test评论test评论test评论test评论test评论test" +
              "评论test评论test评论test评论test评论test评论test评论test" +
              "评论test评论test评论test评论test评论test评论test评论test" +
              "评论test评论test评论test评论test评论test评论test评论test" +
              "评论test评论test评论test评论test评论test评论test评论test" +
              "评论test评论test评论test评论test评论test评论test评论test" +
              "评论test评论test评论test评论test评论test评论test评论test" +
              "评论test评论test评论test评论test评论test评论test评论test" +
              "评论test评论test评论test评论test评论test评论test评论test" +
              "评论test评论test评论test评论test评论test评论test评论test",
          userId: 2,
          time: "2022-06-05 19:32:05",
          pid: null,
          pname: null,
          originId: null,
          essayId: 14,
          username: "rose1",
          showComment:false,
          children: [
            {
              commentId: 7,
              content: "test1",
              userId: 1,
              time: "2022-06-05 19:32:54",
              pid: 6,
              pname: "rose1",
              originId: 6,
              essayId: 14,
              username: "rose0",
              children: null
            },
            {
              commentId: 8,
              content: "test2",
              userId: 1,
              time: "2022-06-05 19:33:22",
              pid: 7,
              pname: "rose0",
              originId: 6,
              essayId: 14,
              username: "rose0",
              children: null
            }
          ]
        },
        {
          commentId: 1,
          content: "评论test",
          userId: 3,
          time: "2022-06-05 16:44:26",
          pid: null,
          pname: null,
          originId: null,
          essayId: 14,
          username: "rose",
          showComment:false,
          children: [
            {
              commentId: 3,
              content: "test3",
              userId: 1,
              time: "2022-06-05 16:47:47",
              pid: 1,
              pname: "rose",
              originId: 1,
              essayId: 14,
              username: "rose0",
              children: null
            },
            {
              commentId: 2,
              content: "评论test2",
              userId: 2,
              time: "2022-06-05 16:47:02",
              pid: 1,
              pname: "rose",
              originId: 1,
              essayId: 14,
              username: "rose1",
              children: null
            },
            {
              commentId: 4,
              content: "test4",
              userId: 3,
              time: "2022-06-05 16:48:08",
              pid: 2,
              pname: "rose1",
              originId: 1,
              essayId: 14,
              username: "rose",
              children: null
            }
          ]
        },
        {
          commentId: 5,
          content: "评论test",
          userId: 3,
          time: "2022-06-05 19:31:34",
          pid: null,
          pname: null,
          originId: null,
          essayId: 14,
          username: "rose",
          showComment:false,
          children: []
        }
      ]

    }
  },
  methods:{
    getThesis(){
      let essayId=this.$route.params.id;
      request.get("/essay/detail",{
        params:{
          essayId:essayId
        }
      }).then(res=>{

      })
    },
    getComments(){
      request.get("/comment",{
        params:{
          essayId:this.thesisContent.essayId
        }
      }).then(res=>{
        if(res.code===0){
          this.comments=res.data;
        }
      })
    }

  },
  mounted() {
    //this.getThesis();
    //this.getComments();
  }
}
</script>

<style scoped>

/* From uiverse.io by @alexreyes091 */
.card {
  width: 100%;
  background: rgb(236, 236, 236,0.5);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.card__content {
  font-size: medium;

}


#note-content{
  margin-top: 20px;
  height: 470px;
  background-color: white;
  border-right: 3px solid #444444;
  border-bottom: 3px solid #444444;
  padding: 10px;
  font-size: small;
}

/* From uiverse.io by @ke1221 */
#find_file {
  color: white;
  padding: 0.7em 1.7em;
  font-size: 10px;
  border-radius: 0.5em;
  background: #3d405b;
  border: 1px solid #e8e8e8;
  transition: all .3s;
}

#find_file:active {
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5,
  inset -4px -4px 12px #ffffff;
}

/* From uiverse.io by @NorthFishHasNa */
#edit-btn {
  display: inline-block;
  border-radius: 4px;
  background-color: #606266;
  border: none;
  color: white;
  text-align: center;
  font-size: 10px;
  padding: 10px;
  width: 100px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

#comment-btn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

#comment-btn span:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -15px;
  transition: 0.5s;
}

#comment-btn:hover span {
  padding-right: 15px;
}

#comment-btn:hover span:after {
  opacity: 1;
  right: 0;
}
</style>