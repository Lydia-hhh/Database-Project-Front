<template>

    <div>
      <div>
        <Aside></Aside>
      </div>
      <div>
        <router-view></router-view>
      </div>
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