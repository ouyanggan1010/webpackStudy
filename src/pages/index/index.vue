<template>
  <div class="divOne">
    <span>{{ title }}</span>
    <a href="./login.html">跳转到login</a>
    <my-count></my-count>
  </div>
</template>
<script>
import $ from "jquery";
import Count from "../../components/count.vue";

export default {
  components: {
    "my-count": Count,
  },
  data() {
    return {
      title: "index页面",
    };
  },
  mounted() {
    // import(/* webpackChunkName:"commonjs" */ "../../commonjs/common.js").then(
    //   ({ default: obj }) => {
    //     console.log(obj.name);
    //   }
    // );
    console.log("999", $);
  },
};
</script>
<style lang="scss" scoped>

.divOne {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  span {
    color: blueviolet;
  }
}
</style>