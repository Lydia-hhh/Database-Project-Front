<template>
  <div style="display: flex">
    <AdminAside/>
    <router-view style="flex: 1"></router-view>
  </div>
</template>

<script>
import AdminAside from "@/components/AdminAside";

export default {
  name: "UserLayout",
  components:{
    AdminAside
  }
}
</script>

<style scoped>

</style>