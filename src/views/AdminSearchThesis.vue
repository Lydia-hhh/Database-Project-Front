<template>

  <div :style="conTop">
    <!--搜索框-->
    <div style="margin-left: 20%;margin-top: 20px;width: 80%">
      <div style="display: inline-block">


        <el-tooltip placement="bottom" effect="light">
          <div slot="content">
            作者：{{selectCondition.author}}<br/>
            发布人：{{selectCondition.username}}<br/>
            会议：{{selectCondition.conference}}<br/>
            论文类型：{{selectCondition.essayType}}<br/>
            研究方向：{{selectCondition.orientation}}<br/>
          </div>
          <el-button type="prime" icon="el-icon-search" @click="centerDialogVisible = true">筛选 </el-button>
        </el-tooltip>
      </div>

      <div style="display: inline-block;width: 55%">

        <el-input id="input" v-model="keyword">
        </el-input>

      </div>

      <div style="display: inline-block">

        <el-button type="primary" icon="el-icon-search" @click="searchEssay">查询 </el-button>


      </div>


    </div>

    <!--搜索框-->

    <div style="height: 20px"></div>
    <!--展示内容-->
    <div style="height: 700px;background: rgb(255,255,255,0.5);width: 90%;margin-left: 5%">
      <div style="height: 20px"></div>
      <el-scrollbar style="height: 100%;overflow-x: hidden;">
        <div v-for="(item,index) in tableData">
          <AdminThesisInfo style="width: 90%;margin-left: 5%"  v-bind:item="item"></AdminThesisInfo>
          <div style="height: 20px"></div>
        </div>

      </el-scrollbar>

    </div>


    <div style="height: 20px"></div>
    <!--展示内容-->

    <!--分页-->
    <div style="width: 60%;margin-left: 20%">
      <el-pagination style="margin: 0 auto"
                     v-model:currentPage="pageNum"
                     v-model:page-size="pageSize"
                     :page-sizes="[5, 10, 15 , 20]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="400"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
      />
    </div>
    <!--分页-->

    <div style="height: 20px"></div>



    <el-dialog
        title="筛选条件"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>

      <el-form label-width="120px"

               style="width: 80%">
        <el-form-item label="作者">
          <el-input v-model="selectCondition.author"/>
        </el-form-item>

        <el-form-item  label="发布人">
          <el-input v-model="selectCondition.username" />
        </el-form-item>

        <el-form-item  label="会议">
          <el-input v-model="selectCondition.conference"/>
        </el-form-item>

        <el-form-item label="论文类型">
          <el-select v-model="selectCondition.essayType">
            <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="研究方向">
          <div class="example-block">
            <el-cascader v-model="selectCondition.orientation" :options="directionOptions" @change="handleChange" />
          </div>

        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>

</template>

<script>
import AdminThesisInfo from "@/components/AdminThesisInfo";
import {directionOptions} from "@/utils/data/directionData";
import request from "@/utils/request";

export default {
  name: "AdminSearchThesis",
  components:{
    AdminThesisInfo,
    // Search,
    directionOptions
  },
  data(){
    return{
      keyword:'',
      conTop:{
        background:"url("+require("../image/bg11.jpg"),
        backgroundSize:"cover"
      },
      selectCondition:{
        author:'',
        username:'',
        conference:'',
        essayType:'',
        orientation:'',


      },
      centerDialogVisible: false,
      pageNum:1,
      pageSize:3,
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
      directionOptions:directionOptions,
      tableData : [
        {
          essayId:1,
          title:"数据库的一篇论文",
          author:"张三",
          conference:"ACM",
          publishDate:"2019-03-15 00:00:00",
          essayType:"工具型",
          digest:"这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是...",
          essayLink:"www.baidu.com",
          username:"rose",
          createTime:"2022-05-18 16:28:31"
        },
        {
          essayId:2,
          title:"数据库的第二篇论文",
          author:"里斯",
          conference:"IEEE",
          publishDate:"2019-03-01 00:00:00",
          essayType:"工具型",
          digest:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要...",
          essayLink:"www.google.com",
          username:"rose",
          createTime:"2022-04-06 16:33:07"

        },
        {
          essayId:3,
          title:"数据库的一篇论文",
          author:"张三",
          conference:"ACM",
          publishDate:"2019-03-15 00:00:00",
          essayType:"工具型",
          digest:"这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是...",
          essayLink:"www.baidu.com",
          username:"rose",
          createTime:"2022-05-18 16:28:31"
        },
        {
          essayId:4,
          title:"数据库的第二篇论文",
          author:"里斯",
          conference:"IEEE",
          publishDate:"2019-03-01 00:00:00",
          essayType:"工具型",
          digest:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要...",
          essayLink:"www.google.com",
          username:"rose",
          createTime:"2022-04-06 16:33:07"
        },
        {
          essayId:5,
          title:"数据库的一篇论文",
          author:"张三",
          conference:"ACM",
          publishDate:"2019-03-15 00:00:00",
          essayType:"工具型",
          digest:"这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是...",
          essayLink:"www.baidu.com",
          username:"rose",
          createTime:"2022-05-18 16:28:31"
        },
        {
          essayId:6,
          title:"数据库的第二篇论文",
          author:"里斯",
          conference:"IEEE",
          publishDate:"2019-03-01 00:00:00",
          essayType:"工具型",
          digest:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要...",
          essayLink:"www.google.com",
          username:"rose",
          createTime:"2022-04-06 16:33:07"
        },
        {
          essayId:7,
          title:"数据库的一篇论文",
          author:"张三",
          conference:"ACM",
          publishDate:"2019-03-15 00:00:00",
          essayType:"工具型",
          digest:"这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是...",
          essayLink:"www.baidu.com",
          username:"rose",
          createTime:"2022-05-18 16:28:31"
        },
        {
          essayId:8,
          title:"数据库的第二篇论文",
          author:"里斯",
          conference:"IEEE",
          publishDate:"2019-03-01 00:00:00",
          essayType:"工具型",
          digest:"摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要...",
          essayLink:"www.google.com",
          username:"rose",
          createTime:"2022-04-06 16:33:07"
        }]

    }
  },
  methods:{
    handleChange(e){
      console.log(e);
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    searchEssay(){
      request.get("/essay").then(res=>{
        if(res.code===0){
          let rawData=res.data;
          for(let i=0;i<rawData.length;i++){
            if(rawData[i].digest.length>75){
              rawData[i].digest=rawData[i].digest.substr(0,75)+"...";
            }
          }
          this.tableData=rawData;
        }

      })
    },
    showDetail(){

    }


  },
  mounted() {
    // this.searchEssay();

  }

}
</script>

<style scoped>
#input{
  height: 2.4em;
  background-color:#A370F0 ;
}

/* From uiverse.io by @adamgiebl */
.cssbuttons-io-button {
  background: #A370F0;
  color: white;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 17px;
  font-weight: 500;
  border-bottom-right-radius: 0.9em;
  border-top-right-radius: 0.9em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 1.6em -0.6em #714da6;
  overflow: hidden;
  position: relative;
  height: 2.4em;
  padding-right: 3.3em;
}

.cssbuttons-io-button .icon {
  background: white;
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 0.7em;
  box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
  right: 0.3em;
  transition: all 0.3s;
}

.cssbuttons-io-button:hover .icon {
  width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color: #7b52b9;
}

.cssbuttons-io-button:hover .icon svg {
  transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
  transform: scale(0.95);
}

</style>