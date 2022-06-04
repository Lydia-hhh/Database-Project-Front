<template>
  <div style="background-color:  #F5F5F7">


    <div style="height: 20px"></div>
    <div style="width: 90%;margin-left: 5%;background-color: #E4E7ED">
    <div style="height: 10px"></div>
    <div style="margin-left: 15%">
      <div style="display: inline-block">
        <el-select style="width: 80px" size="small" v-model="value1" placeholder="年">
          <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
          </el-option>
        </el-select>
      </div>

      <div style="display: inline-block;margin-left: 20px">
        <el-select style="width: 80px" size="small" v-model="value2" placeholder="月">
          <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style="display: inline-block;margin-left: 20px">
        <el-input size="small" style="" placeholder="请输入作者"></el-input>
      </div>
      <div style="display: inline-block;margin-left: 20px">
        <el-input size="small" style="" placeholder="请输入标题"></el-input>
      </div>
      <div style="display: inline-block;margin-left: 20px">
        <el-button size="small">搜索</el-button>
      </div>

    </div>
    <!--展示内容-->
    <div style="width: 80%;margin: 0 12%;">
      <div style="height: 610px">
        <el-scrollbar style="height: 100%;width: 100%;">
          <div v-for="(item,index) in tableData">
            <!--论文内容-->
            <MyNote v-bind:item="item"></MyNote>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <!--展示内容-->
    <div style="height: 20px"></div>
    <!--分页-->
    <div style="width: 60%;margin-left: 20%">
      <el-pagination style="margin: 0 auto"
                     v-model:currentPage="currentPage4"
                     v-model:page-size="pageSize4"
                     :page-sizes="[5, 10, 15 , 20]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="400"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
      />
    </div>
    <!--分页-->
    </div>


    <el-drawer

        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :close="handleClose">
      <span>我来啦!</span>
    </el-drawer>


  </div>

</template>

<script>
import MyNote from "@/components/MyNote";
export default {
  name: "MyNotes",
  components: {MyNote},
  data(){
    return{
      drawer:false,
      direction:'rtl',
      tableData:[
        {
          essayId:10,
          title:"数据库系统设计",
          author:"张军",
          conference:"ACM",
          publishDate:"2020-07-01 08:00:00",
          essayType:"综述型",
          digest:"这个是一篇数据库相关的论文的摘要",
          essayLink:"https://d.wanfangdata.com.cn/periodical/ChlQZXJpb2...",
          username:null,
          createTime:"2022-06-02 23:02:05"
        },
        {
          essayId:9,
          title:"数据库系统设计",
          author:"张大大",
          conference:"ACM",
          publishDate:"2020-07-01 08:00:00",
          essayType:"综述型",
          digest:"这个是一篇数据库相关的论文的摘要",
          essayLink:"https://d.wanfangdata.com.cn/periodical/ChlQZXJpb2...",
          username:null,
          createTime:"2022-05-29 17:14:44"
        },
        {
          essayId:8,
          title:"数据库系统设计",
          author:"张军",
          conference:"ACM",
          publishDate:"2020-07-01 08:00:00",
          essayType:"综述型",
          digest:"这个是一篇数据库相关的论文的摘要",
          essayLink:"https://d.wanfangdata.com.cn/periodical/ChlQZXJpb2...",
          username:null,
          createTime:"2022-05-29 17:09:31"
        },
        {
          essayId:3,
          title:"关于数据库的第三篇论文",
          author:"王五",
          conference:"ACM",
          publishDate:"2015-02-12 00:00:00",
          essayType:"工具型",
          digest:"又是摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要...",
          essayLink:"www.alibaba.com",
          username:null,
          createTime:"2022-04-26 16:34:20"
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
          username:null,
          createTime:"2022-04-06 16:33:07"
        },
        {
          essayId:1,
          title:"数据库的一篇论文",
          author:"张三",
          conference:"ACM",
          publishDate:"2019-03-15 00:00:00",
          essayType:"工具型",
          digest:"这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是很长的摘要，应该存在ES中,这是...",
          essayLink:"www.baidu.com",
          username:null,
          createTime:"2021-11-25 16:28:31"
        }
      ],
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value1: '',
      currentPage4:1,
      pageSize4:3,
      options2: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
      value2: '',
    }
  },
  methods:{
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    showData(e){
      this.drawer=true;
      console.log(e)
    },
    handleClose() {
      this.drawer=false;
    },
    getAllNotes(){
      let userId=window.localStorage.getItem("userInfo").userId;
      request.get("/essay/user",{
        params:{
          userId:userId,
          pageNum:this.pageNum
        }
      }).then(res=>{

      })
    }

  }
}
</script>

<style scoped>


</style>