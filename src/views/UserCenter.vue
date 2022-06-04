<template>

  <div style="background-color: #F5F5F7">



    <!--个人信息介绍-->

    <div id="infoBoard">

      <div id="infoData" style=";display: inline-block;">
        <div style="font-weight: bold;margin:3px">个人信息</div>

        <div style="margin-left: 30px;margin-top: 10px;font-weight: lighter">
        <div>
          <div style="display: inline-block;">用户名：{{info.username}}</div>
          <div style="display: inline-block;margin-left: 100px">
            密码：{{info.password}}
          </div>
        </div>
        <div style="margin-top: 10px">
          <div style="display: inline-block">姓名：{{info.realName}}</div>
          <div style="display: inline-block;margin-left: 100px">邮箱：{{info.email}}</div>
        </div>

        </div>
      </div>


      <div style=";display: inline-block;margin-top: 3%;position: absolute;margin-left: 25%;">
        <button id="button-pwd" @click="centerDialogVisible=!centerDialogVisible"> 修改密码
        </button>
      </div>

    </div>





    <div style="margin-top: 15px">
    <!--笔记方向分布-->
    <div style=";display: inline-block;width: 37.5%;margin-left: 10%">
      <div  id="myPieChart" style=";height: 300px;margin: 15px auto;background-color: white"></div>
    </div>
    <!--近半年来上传笔记数量-->
    <div style=";display: inline-block;width: 37.5%;margin-left: 5%">
      <div  id="myHisChart" style=";height: 300px;margin: 15px auto;background-color: white"></div>
    </div>
    </div>


    <!--近半年来笔记阅览数量-->
    <div style="margin-top: 15px">
      <div  id="myLineChart" style="width: 80%;height: 255px;margin: 15px auto;background-color: white"></div>
    </div>



    <!--弹出框-->
    <div>
      <el-dialog
          title="修改密码"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
        <el-form label-width="100px" v-model="newPwd">
          <el-form-item label="输入新密码">
            <el-input type="password" v-model="newPwd.newpassword"></el-input>
          </el-form-item>

          <el-form-item v-model="newPwd.confirmpwd" label="确认新密码">
            <el-input type="password"></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>


  </div>




</template>

<script>
import request from "@/utils/request";
import * as echarts from "echarts";
export default {
  name:'UserCenter',
  components:{
      echarts
  },
  data() {
    return {
      centerDialogVisible: false,
      newPwd:{
        newpassword:'',
        confirmpwd:'',
      },
      info:{
        userId:1,
        username:'张三',
        password:'123456',
        realName:'张全蛋',
        email:'123@qq.com',
      },

      isDisable:true,
      optionPie : {
        title:{
          text:'笔记方向分布'
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: '机器学习'
              },
              {
                value: 234,
                name: '数据库'
              },
              {
                value: 1548,
                name: 'NLP'
              }
            ]
          }
        ]
      },
      optionHis: {
        title: {
          text: '近半年上传笔记数量'
        },
        tooltip: {},
        legend: {
          data: ['数量']
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {},
        series: [
          {
            name: '数量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      optionLine : {
        title: {
          text: '近半年笔记阅览数量'
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月','6月']
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 23, 19,20],
            type: 'line',
            label: {
              show: true,
              position: 'top',
              textStyle: {
                fontSize: 10
              }
            }
          }
        ]
      },

    }
  },
  methods: {
    getData(){   //获取数据并赋值给middleChartExtend.series.data

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
    changePassword(){
      this.isDisable=false;
    },
    savePassword(){
      this.isDisable=true;
    },
    setUserInfo(){
      request.get("user/info").then(res=>{
        if(res.code===0){
          this.info=res.data;




        }

      })
    }

  },

  mounted() {
    //this.setUserInfo();
    this.drawPieChart();
    this.drawHisChart();
    this.drawLineChart();



  }
}
</script>
<style lang="scss">
#infoBoard{
  /* From uiverse.io by @SharpTH */

    cursor: pointer;
    width: 80%;
    background: rgb(255, 255, 255);
    border-radius: 5px;
    border: 1px solid rgba(49, 49, 50, .2);
    transition: all .2s;
    box-shadow: 12px 12px 2px 1px rgba(49, 49, 50, .2);
  margin-left: 10%;
  margin-top: 10px;
  height: 100px;

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