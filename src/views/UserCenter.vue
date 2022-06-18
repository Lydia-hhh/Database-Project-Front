<template>
  <div :style="conTop" style="background-color: #F5F5F7">

    <div style="height: 100px">
      <span style="font-size: 10px;margin-left: 5px;color: rgb(168,168,168)">当前位置：用户中心</span>
    </div>
    <!--个人信息介绍-->
    <div id="infoBoard">

      <div id="infoData" style=";display: inline-block;">
        <div style="font-size: 20px;font-weight: bold;margin:3px;">个人信息</div>

        <div style="display: flex;justify-content: space-between;margin-left: 30px;margin-top: 10px;font-weight: normal">

          <div>

              <el-image
                  style="width: 130px; height: 130px;border-radius: 50%"
                  :src="url"
                  :fit="'fill'"></el-image>
          </div>
          <div style="margin-left: 40px;width: 320px;">
            <div style="line-height: 30px;margin-top: 20px">
              用户名：{{user.username}}
            </div>
            <div style="line-height: 30px;margin-top: 20px">
              身份：{{user.role}}
            </div>
          </div>
          <div style="width: 40%">
            <div style="line-height: 30px;margin-top: 20px">
              真实姓名：{{user.realName}}
            </div>
            <div style="line-height: 30px;margin-top: 20px">
              邮箱：{{user.email}}
            </div>
          </div>

        </div>



      </div>


      <div style=";display: inline-block;width: 100%;text-align: right">
        <button id="button-pwd" @click="centerDialogVisible=true"> 修改密码
        </button>
      </div>

    </div>




    <div style="margin-top: 50px">
    <!--笔记方向分布-->
    <div style=";display: inline-block;width: 37.5%;margin-left: 10%">
      <el-card shadow="hover">
        <div  id="myPieChart" style=";height: 300px;margin: 15px auto;background-color: white"></div>
      </el-card>

    </div>
    <!--近半年来上传笔记数量-->
    <div style=";display: inline-block;width: 37.5%;margin-left: 5%">

      <el-card shadow="hover">
        <div  id="myHisChart" style=";height: 300px;margin: 15px auto;background-color: white"></div>
      </el-card>

    </div>
    </div>


    <!--近半年来笔记阅览数量-->
    <div style="margin-top: 30px">
      <el-card shadow="hover" style="width: 80%;margin-left: 10%">
        <div  id="myLineChart" style="width: 80%;margin-left: 10%;height: 255px;background-color: white"></div>
      </el-card>

    </div>

    <div style="height: 30px"></div>


    <!--弹出框-->
    <div>
      <el-dialog
          title="更新密码"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>

        <el-form :label-position="'left'" label-width="100px" :model="form">
          <el-form-item label="原密码">
            <el-input type="password" v-model="form.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" v-model="form.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input type="password" v-model="form.confirmPwd"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyPwd">确 定</el-button>
  </span>
      </el-dialog>
    </div>


  </div>




</template>

<script>
import request from "@/utils/request";
import * as echarts from "echarts";
import {alertMessage} from "@/utils";
export default {
  name:'UserCenter',
  components:{
      echarts
  },
  data() {
    return {
      conTop:{
        background:"url("+require("../image/bg11.jpg"),
        backgroundSize:"cover"
      },
      url: require('../image/img1.png'),
      centerDialogVisible: false,
      form:{},
      user:{
        // userId:3,
        // username:"rose",
        // realName:"小红",
        // email:"happy@123.com",
        // role:"普通用户"
      },

      isDisable:true,
      optionPie : {
        title:{
          text:"笔记方向分布"
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              // {
              //   name:'未命名',
              //   value:1
              // }
              // {
              //   name:"计算机技术",
              //   value:2
              // },
              // {
              //   name:"自动化技术及设备",
              //   value:1
              // },
              // {
              //   name:"未知",
              //   value:1
              // }
            ]
          }
        ]
      },
      optionHis: {
        title:{
          text:"近半年上传笔记数量"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2022-06', '2022-05', '2022-04', '2022-03', '2022-02', '2022-1'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [0, 2, 2, 0,0, 0]
          }
        ]
      },
      optionLine : {
        title: {
          text: '近半年笔记阅览数量'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022-06', '2022-05', '2022-04', '2022-03', '2022-02', '2022-1']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [11,23,10,9,65,45],
            type: 'line',
            areaStyle: {}
          }
        ]
      }


    }
  },
  methods: {
    modifyPwd(){
      this.centerDialogVisible=false;
      let data={
        oldPwd:this.form.oldPwd,
        newPwd:this.form.newPwd
      }
      request.put("/user/updatePwd",data).then(res=>{
        console.log(res);
        if(res.code===0){
          this.$message({
            type:'success',
            message:"更新成功！"
          })
        }else{
          this.$message({
            type:'error',
            message:res.msg
          })
        }
      })
      this.form='';
    },
    getData(){   //获取数据并赋值给middleChartExtend.series.data
      let userId=this.user.userId;
      console.log("userId:"+userId);
      request.get("/essay/statistics",{
        params:{
          userId:userId
        }
      }).then(res=>{
        console.log(res);
        if(res.code===0){
          this.optionPie.series[0].data=res.data.group;
          console.log(this.optionPie);
          //================================================
          this.myMiddleChartObj = echarts.init(
              document.getElementById("myPieChart")
          );
          //将图表配置项赋给图表,true参数表示不和之前的数据合并
          this.myMiddleChartObj.setOption(this.optionPie, true);
          //=======================================================

          let sixMonth=res.data.sixMonth;
          let xList=sixMonth.map(function (item){
            return item.name;
          });
          let yList=sixMonth.map(function (item){
            return item.value;
          });
          this.optionHis.xAxis[0].data=xList;
          this.optionHis.series[0].data=yList;
          //====================================================
          this.myMiddleChartObj = echarts.init(
              document.getElementById("myHisChart")
          );
          //将图表配置项赋给图表,true参数表示不和之前的数据合并
          this.myMiddleChartObj.setOption(this.optionHis, true);
          //========================================================


        }else {
          this.$message({
            type:'error',
            message:'获取数据失败。'
          })
        }

      })

    },
    drawPieChart() {             //绘制图表方法
      this.myMiddleChartObj = echarts.init(
          document.getElementById("myPieChart")
      );
      //将图表配置项赋给图表,true参数表示不和之前的数据合并
      this.myMiddleChartObj.setOption(this.optionPie, true);
    },
    drawHisChart() {             //绘制图表方法
      this.myMiddleChartObj = echarts.init(
          document.getElementById("myHisChart")
      );
      //将图表配置项赋给图表,true参数表示不和之前的数据合并
      this.myMiddleChartObj.setOption(this.optionHis, true);
    },
    drawLineChart() {             //绘制图表方法
      this.myMiddleChartObj = echarts.init(
          document.getElementById("myLineChart")
      );
      //将图表配置项赋给图表,true参数表示不和之前的数据合并
      this.myMiddleChartObj.setOption(this.optionLine, true);
    },
    setUserInfo(){
       this.user=JSON.parse(localStorage.getItem("user"));
      if(this.user.role==="N"){
        this.user.role="普通用户"
      }else {
        this.user.role="管理员"
      }
    },
    getEssayDirections(){
      //获取论文的研究方向，在之后会用得到
      request.get("/essay/directions").then(res=>{
        console.log("论文方向"+res)
        if(res.code===0){
          //console.log("论文方向"+res)
          localStorage.setItem("directions",JSON.stringify(res.data));
        }else {
          console.log("获取论文研究方向失败。");
        }
      })
    }

  },


  created() {
    this.setUserInfo();
    this.getEssayDirections();
   // this.getData();



  },

  mounted() {
    //this.setUserInfo();
    this.getData();
    // this.drawPieChart();
    // this.drawHisChart();
    this.drawLineChart();


  },

}
</script>
<style lang="scss">
#infoBoard{
  /* From uiverse.io by @SharpTH */

    cursor: pointer;
    width: 78%;
    background: rgb(255, 255, 255,0.5);
    border-radius: 5px;
    border: 1px solid rgba(49, 49, 50, .2);
    transition: all .2s;
    box-shadow: 12px 12px 2px 1px rgba(49, 49, 50, .2);
  margin-left: 10%;
  //margin-top: 30px;
  padding: 10px;
}

#infoBoard:hover{
  box-shadow: -12px 12px 2px -1px rgba(49, 49, 50, .2);
}
/* From uiverse.io by @alexroumi */
#button-pwd {
  padding: 15px 25px;
  border: unset;
  border-radius: 15px;
  color: #212121;
  z-index: 1;
  background: #e8e8e8;
  position: relative;
  font-weight: 1000;
  font-size: 13px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 250ms;
  overflow: hidden;
}

#button-pwd::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 15px;
  background-color: #212121;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 250ms
}

#button-pwd:hover {
  color: #e8e8e8;
}

#button-pwd:hover::before {
  width: 100%;
}
</style>