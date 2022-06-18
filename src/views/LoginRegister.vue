<template>
  <div :style="conTop" class="login-register">
    <div class="contain">
      <div class="big-box" :class="{active:isLogin}">
        <div class="big-contain" key="bigContainLogin" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="form.username">
            <input type="password" placeholder="密码" v-model="form.password">
            <span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
          </div>
          <button class="bbutton" @click="login">登录</button>
        </div>
        <div class="big-contain" key="bigContainRegister" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="form.username">
            <span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
            <input type="password" placeholder="密码" v-model="form.password">
            <input type="text" placeholder="真实姓名" v-model="form.realName">
            <input type="email" placeholder="邮箱" v-model="form.email">

          </div>
          <button class="bbutton" @click="register">注册</button>
        </div>
      </div>
      <div class="small-box" :class="{active:isLogin}">
        <div class="small-contain" key="smallContainRegister" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，和我们一起旅行</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" key="smallContainLogin" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "LoginRegister",
  data(){
    return {
      isLogin:false,
      emailError: false,
      passwordError: false,
      existed: false,
      form:{
        username:'',
        realName:'',
          email:'',
        password:''
      },
      conTop:{
        backgroundImage:"url("+require("../image/bg13.jpg"),
        backgroundSize:"cover"
      },
      directions:[
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
                  //children:null
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
                  //children:null
                },
                {
                  value:3,
                  label:"自动化技术及设备",
                  //children:null
                },
                {
                  value:4,
                  label:"自动化基础理论",
                  //children:null
                },
                {
                  value:5,
                  label:"遥感技术",
                  //children:null
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
                  //children:null
                },
                {
                  value:7,
                  label:"微电子学",
                  //children:null
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods:{
    changeType() {
      this.isLogin = !this.isLogin
      this.form.username = ''
      this.form.email = ''
      this.form.password = ''
    },
    alertMessage(msg,status){
        this.$message({
          message:msg,
          type:status
        })
    },
    login() {
      //获取论文的研究方向，在之后会用得到
      // request.get("/essay/directions").then(res=>{
      //   if(res.code===0){
      //     window.localStorage.setItem("directions",res.data);
      //   }else {
      //     console.log("获取论文研究方向失败。");
      //   }
      // })

      if(this.form.username!=="" && this.form.password!==""){
        let data={
          username: this.form.username,
          password: this.form.password
        }
        request.post('/user/login',data).then(res=>{
          console.log(res);
            if(res.code===0){
              this.$message({
                type:'success',
                message:'登录成功！'
              })
              let user=JSON.stringify(res.data.user);
              let token=JSON.stringify(res.data.token);
              localStorage.setItem("user",user);
              localStorage.setItem("token",token);
              if(res.data.user.role==="N"){
                this.$router.push("/user/usercenter");
              }else {
                this.$router.push("/admin/usercenter");
              }
            }else {
              this.$message({
                type:'success',
                message:res.msg
              })
            }
        })
      }else {
        alert("填写不能为空！")
      }
    },
    register() {
      if(this.form.username!=="" && this.form.realName!="" && this.form.password!=="" && this.form.email!==""){
        request.post('/user/register',this.form).then(res=>{
              if(res.code===0){
                this.$message({
                  type:'success',
                  message:'注册成功！'
                })
              }else {
                this.$message({
                  type:'error',
                  message:res.msg
                })
              }
        })
      }else {
        alert("填写不能为空！")
      }

    }
  },

  created() {
    //this.$store.commit("addDirections",this.directions);
  }
}
</script>

<style scoped>
.login-register{
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
.contain{
  width: 60%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}
.big-box{
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle{
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(49,49,50);
}
.bform{
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips{
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input{
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.bbutton{
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(49,49,50);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box{
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg,rgb(218,218,218),rgb(49,49,50));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle{
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent{
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton{
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active{
  left: 0;
  transition: all 0.5s;
}
.small-box.active{
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>