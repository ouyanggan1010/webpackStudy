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
  width: 50px;
  height: 50px;
  border: 1px solid red;
  span{
      color: blueviolet;
  }
}
</style>