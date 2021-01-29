<template>
  <div class="divOne">
    <span>{{ title }}</span>
    <div class="iconfont icon-luxiang"></div>
  </div>
</template>
<script>
import(/* webpackChunkName:"iconfont" */ "../../css/iconfont.css");
export default {
  data() {
    return {
      title: "login页面",
    };
  },
};
</script>
<style lang="scss" scoped>
.divOne {
  width: 200px;
  height: 200px;
  border: 1px solid brown;
  span{
      color: rgb(172, 230, 14);
  }
}
</style>