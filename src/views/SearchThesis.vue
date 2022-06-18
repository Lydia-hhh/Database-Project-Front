<template xmlns="http://www.w3.org/1999/html">

  <div :style="conTop" style="background-color:  white">
    <div style="height: 30px">
      <span style="font-size: 10px;margin-left: 5px;color: rgb(168,168,168)">当前位置：查找论文</span>
    </div>
  <!--搜索框-->
  <div style="margin-left: 20%;width: 80%">
    <div style="display: inline-block">


      <el-tooltip placement="bottom" effect="light">
        <div slot="content">
          作者：{{selectCondition.author}}<br/>
          发布人：{{selectCondition.username}}<br/>
          会议：{{selectCondition.conference}}<br/>
          论文类型：{{selectCondition.essayType}}<br/>

          研究方向：<span v-for="(item,index) in selectCondition.orientation">{{item}}&nbsp;</span>
        </div>
        <el-button type="prime" icon="el-icon-search" @click="centerDialogVisible = true">筛选 </el-button>
      </el-tooltip>
    </div>

    <div style="display: inline-block;width: 55%">

      <el-input id="input" placeholder="请输入标题或摘要" v-model="selectCondition.keyword">
      </el-input>

    </div>

    <div style="display: inline-block">

        <el-button type="primary" icon="el-icon-search" @click="searchEssay">查询 </el-button>


    </div>


  </div>

    <!--搜索框-->

<div style="height: 20px"></div>
    <!--展示内容-->
    <div style="height: 700px; ">
      <el-scrollbar style="height: 100%;overflow-x: hidden;background: rgb(255,255,255,0.5);width: 80%;margin-left: 10%">
        <div style="height: 50px"></div>
        <div v-for="(item,index) in tableData">

          <AdminThesisInfo style="width: 80%;margin-left: 10%" v-bind:item="item" v-bind:role="role"></AdminThesisInfo>
          <div style="height: 20px"></div>
        </div>

      </el-scrollbar>

    </div>


    <!--展示内容-->

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

    <div style="height: 40px"></div>


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
<!--            <el-cascader v-model="selectCondition.orientation" :options="directionOptions" @change="handleChange" />-->

            <el-cascader
                v-model="selectCondition.orientation"
                :options="directionOptions"
                :props="{ checkStrictly: true }"
                ref="cascader"
                @change="handleChange"
                clearable></el-cascader>
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
// import {Search} from '@element-plus/icons-vue'
import {directionOptions} from "@/utils/data/directionData";
import request from "@/utils/request";
import {alertMessage} from "@/utils";
import AdminThesisInfo from "@/components/AdminThesisInfo";
export default {
  name: "SearchThesis",
  components: {
    AdminThesisInfo,
    // Search,
    directionOptions
  },
  data() {
    return {
      role:'N',
      conTop: {
        background: "url(" + require("../image/bg11.jpg"),
        backgroundSize: "cover"
      },
      selectCondition: {
        keyword: '',
        author: '',
        username: '',
        conference: '',
        essayType: '',
        orientation: [],
      },
      centerDialogVisible: false,
      pageNum: 1,
      typeOptions: [
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
      directionOptions: [],
      tableData: []

    }
  },
  methods: {
    handleChange() {

      let nodesInfo = this.$refs['cascader'].getCheckedNodes()
      // console.log(nodesInfo)
      let pathNodes=nodesInfo[0].pathNodes;
      // console.log(pathNodes)
      for(let i=0;i<pathNodes.length;i++){
        this.selectCondition.orientation[i]=pathNodes[i].label;
      }
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },


    searchEssay() {
      let classificationId=null;
      let groupId=null;
      let branchId=null;
      let data=null;
      if(this.selectCondition.orientation.length===1){
        classificationId=this.selectCondition.orientation[0];
        data={
          keyword:this.selectCondition.keyword,
          classificationId:classificationId,
          essayType: this.selectCondition.essayType,
          author:this.selectCondition.author,
          ownerName:this.selectCondition.username,
          conference: this.selectCondition.conference,
          createTime: '',
          pageNum: this.pageNum
        }

      }else if(this.selectCondition.orientation.length===2){
        classificationId=this.selectCondition.orientation[0];
        groupId=this.selectCondition.orientation[1];
        data={
          keyword:this.selectCondition.keyword,
          classificationId:classificationId,
          groupId:groupId,
          essayType: this.selectCondition.essayType,
          author:this.selectCondition.author,
          ownerName:this.selectCondition.username,
          conference: this.selectCondition.conference,
          createTime: '',
          pageNum: this.pageNum
        }
      }else if(this.selectCondition.orientation.length===3){
        classificationId=this.selectCondition.orientation[0];
        groupId=this.selectCondition.orientation[1];
        branchId=this.selectCondition.orientation[2];
        data={
          keyword:this.selectCondition.keyword,
          classificationId:classificationId,
          groupId:groupId,
          branchId:branchId,
          essayType: this.selectCondition.essayType,
          author:this.selectCondition.author,
          ownerName:this.selectCondition.username,
          conference: this.selectCondition.conference,
          createTime: '',
          pageNum: this.pageNum
        }
      }
      request.get("/essay",{
        params:{
          data:data
        }
      }).then(res => {
        if (res.code === 0) {
          let rawData = res.data;
          for (let i = 0; i < rawData.length; i++) {
            if (rawData[i].digest.length > 75) {
              rawData[i].digest = rawData[i].digest.substr(0, 75) + "...";
            }
          }
          this.tableData = rawData;
        } else {
          alertMessage("获取论文失败。", "error")
        }

      })
    },
    showDetail() {

    },
    getEssay(){
      let data={
          keyword:'',
          classificationId:'',
          groupId:'',
          branchId:'',
          essayType: '',
          author:'',
          ownerName:'',
          conference:'',
          createTime: '',
          pageNum: this.pageNum
        }
      request.get("/essay",{
        params:{
          data:data
        }
      }).then(res=>{
        if (res.code === 0) {
          let rawData = res.data;
          for (let i = 0; i < rawData.length; i++) {
            if (rawData[i].digest.length > 75) {
              rawData[i].digest = rawData[i].digest.substr(0, 75) + "...";
            }
          }
          this.tableData = rawData;
        } else {
          this.$message({
            type:'error',
            message:res.msg
          })
        }
      })
    }


  },
  mounted() {
    // this.searchEssay();

  },
  created() {
    //this.directionOptions = this.$store.state.directions;
    this.getEssay();
    //this.role=window.localStorage.getItem("user").role;

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