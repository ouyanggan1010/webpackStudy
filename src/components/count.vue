<template>
  <div class="divTne">
    <span>{{ title }}</span>
  </div>
</template>
<script>
export default {
  name:"count",
  data() {
    return {
      title: "测试vue文件",
    };
  },
};
</script>
<style lang="scss" scoped>
.divTne {
  width: 80px;
  height: 80px;
  border: 1px solid red;
  span{
      color: rgb(46, 43, 226);
  }
}
</style>