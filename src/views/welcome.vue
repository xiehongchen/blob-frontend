<template>
  <div class="background">
    <Header />
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header.vue";
</script>

<style scoped lang="scss">
.el-main {
  height: calc(100vh - 60px);
}
.background {
  background-image: url("@/assets/back.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
