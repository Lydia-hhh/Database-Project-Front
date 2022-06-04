<template>

<div id="info" >
  <div style="height: 10px"></div>
  <div style="font-weight: bold;margin-left: 10px;font-size: 15px">
    {{item.title}}
  </div>
  <div style="height: 10px"></div>
  <div style="color: #8c939d;margin-left: 10px">
    <span>{{item.author}}</span>
    <span style="margin-left: 30px">原文链接：{{item.essayLink}}</span>
  </div>
  <div style="height: 10px"></div>
  <div style="margin-left: 10px">
    <span>{{item.digest}}</span>
  </div>
  <div style="height: 15px"></div>
  <div style="margin-left: 10px;color: #8c939d">
    引用论文链接：{{item.conference}}
  </div>
  <div style="height: 10px"></div>
  <div style="margin-left: 10px">
    <div style="display: inline-block;width: 60%;height: 20px;line-height: 20px;color: #8c939d">
      上传用户：{{item.username}}
    </div>
    <div style="display: inline-block;width: 30%;height: 20px;line-height: 20px;color: #8c939d">
      上传时间：{{item.createTime}}
    </div>

    <button id="button-thesis" @click="showDetail(item.essayId)"> 详情
    </button>
  </div>
  <div style="height: 10px"></div>

</div>

</template>

<script>
export default {
  name: "ThesisInfo",

  props:{
    item:{
      type:Object,
    }
  },
  methods:{
    showDetail(essayId){
      this.$router.push({
        name:'ThesisDetail',
        params:{
          id:essayId
        }
      })
    },
  },

}
</script>

<style scoped>
#info{
  width: 60%;
  border-left: 2px solid  #282936;
  border-bottom: 2px solid #282936;
  margin: 15px 20%;
  background-color:  white;
  font-size: 12px;
}

/* From uiverse.io by @adamgiebl */
#button-thesis {
  color: #090909;
  padding: 0.7em 1.7em;
  font-size: 10px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  transition: all .3s;
  box-shadow: 6px 6px 12px #c5c5c5,
  -6px -6px 12px #ffffff;
}

#button-thesis:hover {
  border: 1px solid white;
}

#button-thesis:active {
  box-shadow: 4px 4px 12px #c5c5c5,
  -4px -4px 12px #ffffff;
}

</style>