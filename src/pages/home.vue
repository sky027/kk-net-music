<template>
  <div class="home">
    <top-bar class="top_box"></top-bar>
    <div class="bot_box">
      <router-view />
    </div>
  </div>
</template>

<script>
import topBar from '@/pages/topBar.vue';
export default {
  name: 'home',
  components: {
    topBar
  }
};
</script>

<style scoped lang="less">
.home{
  height: 100%;
  .bot_box{
    height: calc(~"100% - 50px");
  }
}
</style>
