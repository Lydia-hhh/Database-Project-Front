<template>



  <div style="background-color: #F5F5F7">
    <div style="height: 20px"></div>
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
        <div style="height: 10px"></div>
        <div>研究方向：
          <span v-for="(item,index) in thesisInfo.directionValue">{{item}} </span>
        </div>
        <div style="height: 10px"></div>
        <div>
          摘要：{{thesisInfo.digest}}
        </div>
        <div style="height: 10px"></div>
        <div>原文链接：{{thesisInfo.essayLink}}</div>
        <div style="height: 10px"></div>
        <div>引用链接：
          <span v-for="(item,index) in references">
          {{item}}
        </span>
        </div>

      </div>

      <div class="heading">
        <div style="display: inline-block">
          论文信息
        </div>
        <div style="margin-left: 83%;display: inline-block">
          <el-button type="prime" size="mini" @click="drawer=true">填写论文信息</el-button>
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
                  <el-input v-model="thesisInfo.author" />
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

                <el-form-item label="研究方向">

                  <el-cascader
                    :options="thesisDirection"
                    :props="{checkStrictly:true}"
                    ref="cascader"
                    @change="handleChange1"
                    clearable></el-cascader>

                </el-form-item>


                <el-form-item label="摘要">
                  <textarea v-model="thesisInfo.digest"></textarea>
                </el-form-item>

                <el-form-item label="原文链接">
                  <el-input v-model="thesisInfo.essayLink"/>
                </el-form-item>

                <!--引用是多选-->
                <el-form-item label="添加引用">
                  <el-select
                      v-model="referValue"
                      multiple
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请输入关键词"
                      :remote-method="remoteMethod"
                      :loading="referLoading"
                      @change="changeValue($event)">
                    <el-option
                        v-for="item in referOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
        </div>
        <div style="height: 10px"></div>
        <div style="width: 100%;text-align: center">

          <button id="button-save" @click="drawer=!drawer">
            <span class="button_top" @click="saveRefer"> 保存
            </span>
          </button>
        </div>
        <div style="height: 20px"></div>

      </template>
    </el-drawer>

    <div style="height: 10px"></div>

  <div id="input-blank">
    <mavon-editor style="width: 100%;height: 100%" ref="md" v-model="content" :ishljs="true" @imgAdd="imgAdd"></mavon-editor>
  </div>

    <div style="display: inline-block;width: 88%">
      <button class="button-2" @click="centerDialogVisible = true"> 上传附件
      </button>
    </div>

    <div style="display: inline-block;width: 12%">
      <button class="button-2" @click="saveThesisAndNote"> 保存
      </button>
    </div>


  </div>


    <el-dialog
        title="上传附件"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <el-upload
          class="upload-demo"
          action="/file/attachment/upload"
          :on-change="handleChange"
          :file-list="fileList">
        <div>
            <el-button size="small" type="primary">点击上传</el-button>
        </div>
      </el-upload>


      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>



  </div>

</template>

<script>

import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from "axios";
import request from "@/utils/request";
export default {
  name: "AddThesis",
  components: { Editor, Toolbar },
  data() {
    return {
      references:[],
      referOptions: [],
      referValue: [],
      referList: [
        {
          value:1,
          label:"数据库的扩展原理"
        },
        {
          value:4,
          label:"深入题解数据库系统"
        },
        {
          value:6,
          label:"我不知道数据库是什么"
        }
      ],
      referLoading: false,
      reference:'',
      cserve:null,
      centerDialogVisible: false,
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
        title:"数据库系统设计",
        author:"张军",
        conference:"ACM",
        publishDate:"2020-07-01 08:00:00",
        essayType:"综述型",
        directionValue:[],
        digest:"这个是一篇数据库相关的论文的摘要",
        essayLink:"https://d.wanfangdata.com.cn/periodical/ChlQZXJpb2...",
        referenceIds:[
          1,
          2,
          3
        ],
        branchId:1,
        content:"这个是笔记的主要内容，是markdown格式的",
        attachment:"http://localhost:8080/files/image/uuid"
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
      console.log(fileList)
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
    setThesisDirection(){

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
      let classificationId=null;
      let groupId=null;
      let branchId=null;
      let data=null;
      if(this.thesisDirection.length===1){
        classificationId=this.thesisDirection[0];
        data={
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
      request.post("/essay",data).then(res=>{
        if(res.code===0){
            console.log("提交成功！")
        }else {
          console.log("提交失败！")
        }
      })
    },
    getEssayTitle(){
      request.get("/essay/accurateTitle",{
        params:{
          key:""
        }
      }).then(res=>{
        if(res.code===0){
          //this.referList=res.data;
          for(let i=0;i<res.data.length;i++){
            this.referList[i].value=res.data[i].essayId;
            this.referList[i].label=res.data[i].title;
          }
        }
      })
    },

    remoteMethod(query) {
      if (query !== '') {
        this.referLoading = true;
        setTimeout(() => {
          this.referLoading = false;
          this.referOptions = this.referList.filter(item => {
            return item.label
                .indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.referOptions = [];
      }
    },
    changeValue(e){
      this.thesisInfo.referenceIds=e;
    },
    findRefer(value){
      //console.log(this.referList.length)
      for (let i=0;i<this.referList.length;i++){
        //console.log("value1:"+value+" value2:"+this.referList[i].value);
        if(value===this.referList[i].value){
          return this.referList[i].label;
        }
      }
    },
    saveRefer(){
      let referArray=[];
      for (let i=0;i<this.referValue.length;i++){
          referArray[i]=this.findRefer(this.referValue[i]);
      }
      this.references=referArray;
      //console.log(referArray)

    },






  },
  mounted() {
    //this.getEssayTitle();
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
  border-right: 2px solid #282936;
  border-bottom: 2px solid #282936;
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
  background: white;
  padding: .4em;
  border-radius: 6px;
}

.card-image {
  background-color: rgb(236, 236, 236);
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