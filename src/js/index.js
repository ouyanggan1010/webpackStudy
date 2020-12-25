import "../css/iconfont.css";
import "../scss/style.scss";

console.log(55);
import Vue from "vue";
import Count from "./index.vue";

new Vue({
  el: "#root",
  data: {
    msg: "三十岁",
  },
  render: h => h(Count),
  mounted() {
    console.log("999");
  },
});
