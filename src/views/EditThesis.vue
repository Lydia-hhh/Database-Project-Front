<template>
  <div :style="conTop">
    <div style="height: 20px">
      <span style="font-size: 10px;margin-left: 5px;color: rgb(168,168,168)">当前位置：{{from}} > 详情</span>
    </div>
    <div style="width: 90%;margin: 0 5%">

      <div class="card">
        <div class="card-image">
          <div>标题：{{thesisInfo.title}}</div>
          <div style="height: 10px"></div>
          <div>
            <div style="display: inline-block;width: 50%">作者：{{thesisInfo.author}}</div>
            <div style="display: inline-block;width: 50%">会议：{{thesisInfo.conference}}</div>
          </div>
          <div style="height: 10px"></div>
          <div>
            <div style="display: inline-block;width: 50%">出版时间：{{thesisInfo.publishDate}}</div>
            <div style="display: inline-block;width: 50%">论文类型：{{thesisInfo.essayType}}</div>
          </div>
<!--          <div>研究方向：-->
<!--            <span v-for="(item,index) in thesisInfo.directionValue">{{item}}</span>-->
<!--          </div>-->
          <div style="height: 10px"></div>
          <div>
            摘要：{{thesisInfo.digest}}
          </div>
          <div style="height: 10px"></div>
          <div>原文链接：{{thesisInfo.essayLink}}</div>
          <div style="height: 10px"></div>
          <div>引用链接：
            <span v-for="(item,index) in thesisInfo.references">
              {{item.title}}
            </span>
          </div>
          <div style="height: 10px"></div>
          <div>
            <div style="display: inline-block;width: 50%">
              上传用户：{{thesisInfo.username}}
            </div>
            <div style="display: inline-block;width: 50%">
              上传时间：{{thesisInfo.publishDate}}
            </div>
          </div>
        </div>

        <div class="heading">
          <div style="display: inline-block">
            论文信息
          </div>
          <div style="margin-left: 83%;display: inline-block">
            <el-button v-if="user.userId===thesisInfo.userId && editable" type="prime" size="mini" @click="drawer=true">填写论文信息</el-button>
          </div>
        </div>



      </div>

      <el-drawer title="填写论文信息" :before-close="handleClose" :visible.sync="drawer" :direction="direction" style="width: 60%;margin-left: 20%;height: 1820px">

        <template #default>
          <div>
            <el-form label-width="120px" style="width: 80%" size="small">
              <el-form-item label="标题">
                <el-input v-model="thesisInfo.title"/>
              </el-form-item>

              <el-form-item label="作者">
                <el-input v-model="thesisInfo.author"/>
              </el-form-item>

              <el-form-item label="会议">
                <el-input v-model="thesisInfo.conference"/>
              </el-form-item>

              <!--时间选择器-->
              <el-form-item label="出版时间">
                <el-input v-model="thesisInfo.publishDate"/>
              </el-form-item>


              <el-form-item label="论文类型">
                <el-select v-model="thesisType">
                  <el-option
                      v-for="item in typeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-cascader
                  :options="thesisDirection"
                  :props="{checkStrictly:true}"
                  ref="cascader"
                  @change="handleChange1"
                  clearable></el-cascader>
              </el-form-item>

              <el-form-item label="摘要">
                <textarea></textarea>
              </el-form-item>

              <el-form-item label="原文链接">
                <el-input/>
              </el-form-item>

              <!--引用是多选-->
              <el-form-item label="添加引用">
                <el-select v-model="thesisType">
                  <el-option
                      v-for="item in typeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div style="height: 10px"></div>
          <div style="width: 100%;text-align: center">

            <button id="button-save" @click="drawer=!drawer">
            <span class="button_top" @click="saveThesisAndNote"> 保存
            </span>
            </button>
          </div>
          <div style="height: 20px"></div>

        </template>
      </el-drawer>

      <div style="height: 10px"></div>

      <div id="input-blank">
        <mavon-editor
            :box-shadow="true"
            :transition="true"
            :toolbars-background="'#444444'"
            :toolbars-flag="toolBar"
            :subfield="subField"
            :default-open="dOpen"
            :editable="editable"
            style="width: 100%;height: 100%" ref="md" v-model="thesisInfo.content" :ishljs="true" @imgAdd="imgAdd"></mavon-editor>
      </div>

      <div style="display: inline-block;width: 88%">
        <button class="button-2" v-if="thesisInfo.userId!==user.userId" @click="centerDialogVisible2 = true">
          查看附件</button>
        <button class="button-2" v-if="thesisInfo.userId===user.userId" @click="centerDialogVisible1 = true">
          上传附件</button>
      </div>

      <div style="display: inline-block;width: 12%" v-if="thesisInfo.userId===user.userId">
        <button v-if="editable" class="button-2" @click="saveThesisAndNote"> 保存
        </button>
        <button v-if="!editable" class="button-2" @click="toEdit">编辑</button>
      </div>
      <!--评论区-->
      <el-divider></el-divider>
      <div>
        <div style=";font-weight: bold">
          <span>评 论 区</span>
        </div>
        <div style="">
          <Comment :comments="comments" :essay-id="thesisInfo.essayId"></Comment>
        </div>

      </div>

    </div>

    <el-dialog
        title="上传附件"
        :visible.sync="centerDialogVisible1"
        width="30%"
        center>
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList">
        <div>

          <el-button size="small" type="primary">点击上传</el-button>



        </div>

        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>



      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible1 = false">取 消</el-button>
    <el-button @click="centerDialogVisible1 = false">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="上传附件"
        :visible.sync="centerDialogVisible2"
        width="30%"
        center>
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList">
        <div>


        </div>

        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>



      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible2 = false">取 消</el-button>
    <el-button @click="centerDialogVisible2 = false">确 定</el-button>
  </span>
    </el-dialog>


  </div>

</template>

<script>
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import axios from "axios";
import CommentAdd from "@/components/CommentAdd";
import CommentList from "@/components/CommentList";
import Comment from "@/components/Comment";
import request from "@/utils/request";
import {alertMessage} from "@/utils";
export default {
  name: "EditThesis",
  components: { Editor, Toolbar,CommentAdd,CommentList,Comment },
  data() {
    return {
      from:'',
      centerDialogVisible2:false,
      user:{
        userId:1,
        username:"rose",
        realName:"小红",
        email:"happy@123.com",
        role:"N"
      },
      toolBar:false,
      subField:false,
      dOpen:'preview',
      editable:false,
      essayId:'',
      conTop:{
        background:"url("+require("../image/bg11.jpg"),
        backgroundSize:"cover"
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
      ],
      centerDialogVisible1: false,
      drawer: false,
      direction: 'ttb',
      editor: null,
      content:'',
      thesisType:'',
      toolbarConfig: { },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      typeOptions : [
        {
          value: '理论证明型',
          label: '理论证明型',
        },
        {
          value: '综述型',
          label: '综述型',
        },
        {
          value: '实验型',
          label: '实验型',
        },
        {
          value: '工具型',
          label: '工具型',
        },
        {
          value: '数据集型',
          label: '数据集型',
        },
      ],
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      thesisInfo:{
        essayId:3,
        title:"关于数据库的第三篇论文",
        author:"王五",
        conference:"ACM",
        publishDate:"2015-02-12 00:00:00",
        essayType:"工具型",
        digest:"又是摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要...",
        essayLink:"www.alibaba.com",
        userId:3,
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
      thesisDirection:[
        {
          value:1,
          label:"其他",
          children:[
            {
              value:1,
              label:"其他",
              children:[
                {
                  value:1,
                  label:"其他",
                  children:null
                }
              ]
            }
          ]
        },
        {
          value:2,
          label:"工业技术",
          children:[
            {
              value:2,
              label:"自动化技术",
              children:[
                {
                  value:2,
                  label:"计算机技术",
                  children:null
                },
                {
                  value:3,
                  label:"自动化技术及设备",
                  children:null
                },
                {
                  value:4,
                  label:"自动化基础理论",
                  children:null
                },
                {
                  value:5,
                  label:"遥感技术",
                  children:null
                }
              ]
            },
            {
              value:3,
              label:"电子技术",
              children:[
                {
                  value:6,
                  label:"通信",
                  children:null
                },
                {
                  value:7,
                  label:"微电子学",
                  children:null
                }
              ]
            }
          ]
        }
      ]


    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    imgAdd(pos,$file){
      let $vm=this.$refs.md;
      const formData=new FormData();
      formData.append('file',$file);
      axios({
        url:'http://localhost:9090/file/upload',
        method:'POST',
        data:formData,
        headers:{'Content-Type':'multipart/form-data'}
      }).then((res)=>{
        $vm.$img2Url(pos,res.data);
      })
    },
    handleChange1(){
      let nodesInfo = this.$refs['cascader'].getCheckedNodes()
      // console.log(nodesInfo)
      let pathNodes=nodesInfo[0].pathNodes;
      // console.log(pathNodes)
      for(let i=0;i<pathNodes.length;i++){
        this.thesisInfo.directionValue[i]=pathNodes[i].label;
      }
      console.log(this.thesisInfo.directionValue)
    },
    saveThesisAndNote(){
      this.editable=false;
      this.toolBar=false;
      this.subField=false;
      this.dOpen='preview';
      let classificationId=null;
      let groupId=null;
      let branchId=null;
      let data=null;
      if(this.thesisDirection.length===1){
        classificationId=this.thesisDirection[0];
        data={
          essayId:this.thesisInfo.essayId,
          title:this.thesisInfo.title,
          author:this.thesisInfo.author,
          conference: this.thesisInfo.conference,
          publishDate: this.thesisInfo.publishDate,
          essayType: this.thesisInfo.essayType,
          digest: this.thesisInfo.digest,
          essayLink: this.thesisInfo.essayLink,
          referenceIds: this.thesisInfo.referenceIds,
          classificationId:classificationId,
          content: this.thesisInfo.content,
          attachment: this.thesisInfo.attachment
        }

      }else if(this.thesisDirection.length===2){
        classificationId=this.thesisDirection[0];
        groupId=this.thesisDirection[1];
        data={
          essayId:this.thesisInfo.essayId,
          title:this.thesisInfo.title,
          author:this.thesisInfo.author,
          conference: this.thesisInfo.conference,
          publishDate: this.thesisInfo.publishDate,
          essayType: this.thesisInfo.essayType,
          digest: this.thesisInfo.digest,
          essayLink: this.thesisInfo.essayLink,
          referenceIds: this.thesisInfo.referenceIds,
          classificationId:classificationId,
          groupId:groupId,
          content: this.thesisInfo.content,
          attachment: this.thesisInfo.attachment
        }

      }else if(this.thesisDirection.length===3){
        classificationId=this.thesisDirection[0];
        groupId=this.thesisDirection[1];
        branchId=this.thesisDirection[2];
        data={
          essayId:this.thesisInfo.essayId,
          title:this.thesisInfo.title,
          author:this.thesisInfo.author,
          conference: this.thesisInfo.conference,
          publishDate: this.thesisInfo.publishDate,
          essayType: this.thesisInfo.essayType,
          digest: this.thesisInfo.digest,
          essayLink: this.thesisInfo.essayLink,
          referenceIds: this.thesisInfo.referenceIds,
          classificationId:classificationId,
          groupId:groupId,
          branchId:branchId,
          content: this.thesisInfo.content,
          attachment: this.thesisInfo.attachment
        }
      }
      request.put("/essay",data).then(res=>{
        if(res.code===0){
          console.log("更新成功！")
        }else {
          console.log("更新失败！")
        }
      })
    },
    toEdit(){
      this.editable=true;
      this.toolBar=true;
      this.subField=true;
      this.dOpen='edit';
    },

    getEssayDetail() {
      this.essayId=this.$route.params.essayId;
        request.get("/essay/detail",{
          params:{
            essayId:this.essayId
          }
        }).then(res=>{
          if(res.code===0){
            this.thesisInfo=res.data;
          }else {
            alertMessage("获取笔记失败。","error");
          }
        })
    },
    getComments() {
      this.essayId=this.$route.params.essayId;
      request.get("/comment",{
        params:{
          essayId:this.essayId
        }
      }).then(res=>{
        if(res.code===0){
          this.comments=res.data;
        }else {
          alertMessage("获取评论失败。","error");
        }
      })
    },
    setFrom(){
      this.from=this.$route.params.from;
    }


  },
  created() {
    //this.getEssayDetail();
    //this.getComments();
    //this.user=window.localStorage.getItem("user");
    this.setFrom();
  },
  mounted() {

  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
}
</script>

<style scoped>

/* From uiverse.io */
.button-2 {
  --color: #282936;
  font-family: inherit;
  display: inline-block;
  width: 8em;
  height: 2.6em;
  line-height: 2.5em;
  margin: 20px;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color);
  transition: color .5s;
  z-index: 1;
  font-size: 10px;
  border-radius: 6px;
  font-weight: 500;
  color: var(--color);
}

.button-2:before {
  content: "";
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 150px;
  width: 200px;
  border-radius: 50%;
}

.button-2:hover {
  color: #fff;
}

.button-2:before {
  top: 100%;
  left: 100%;
  transition: all .7s;
}

.button-2:hover:before {
  top: -30px;
  left: -30px;
}

.button-2:active:before {
  background: #282936;
  transition: background 0s;
}
#input-blank{
  width: 100%;
  height: 700px;
}

/* From uiverse.io by @Voxybuns */
#button-save {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #e8e8e8;
  --button_outline_color: #000000;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
}

.button_top {
  display: block;
  box-sizing: border-box;
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  padding: 0.75em 1.5em;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
}

#button-save:hover .button_top {
  /* Pull the button upwards when hovered */
  transform: translateY(-0.33em);
}

#button-save:active .button_top {
  /* Push the button downwards when pressed */
  transform: translateY(0);
}

/* From uiverse.io by @Voxybuns */
#button-upload {
  /* Variables */
  --button_radius: 0.75em;
  --button_color: #e8e8e8;
  --button_outline_color: #000000;
  font-size: 10px;
  font-weight: bold;
  border: none;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
}

#button-upload.button_top {
  display: block;
  box-sizing: border-box;
  border: 2px solid var(--button_outline_color);
  border-radius: var(--button_radius);
  padding: 0.75em 1.5em;
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
}

#button-upload:hover .button_top {
  /* Pull the button upwards when hovered */
  transform: translateY(-0.33em);
}

#button-upload:active .button_top {
  /* Push the button downwards when pressed */
  transform: translateY(0);
}

/* From uiverse.io by @alexmaracinaru */
.card {
  width: 99%;
  background: rgb(255,255,255,0.5);
  padding: .4em;
  border-radius: 6px;
  border: 1px solid #bcbec2;
}

.card-image {
  background-color: rgb(236, 236, 236,0.5);
  width: 98%;
  height: 75%;
  border-radius: 6px 6px 0 0;
  padding: 10px;
}

.card-image:hover {
  transform: scale(0.98);
}


.heading {
  font-weight: 600;
  color: rgb(88, 87, 87);
  padding: 7px;
}

.heading:hover {
  cursor: pointer;
}
</style>