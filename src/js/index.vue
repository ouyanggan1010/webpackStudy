<template>
  <div class="divOne">
    <span>{{ title }}</span>
    <a href="./login.html">跳转到login</a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "index页面",
    };
  },
};
</script>
<style lang="scss" scoped>
.divOne {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  span{
      color: blueviolet;
  }
}
</style>