<template>
  <div style="display: flex">
    <Aside/>
    <router-view style="flex: 1"></router-view>
  </div>
</template>

<script>
import Aside from "@/components/Aside";

export default {
  name: "UserLayout",
  components:{
    Aside
  }
}
</script>

<style scoped>

</style>