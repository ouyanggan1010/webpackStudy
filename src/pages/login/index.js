import(/* webpackChunkName:"commonjs" */ "../../commonjs/common.js");

import Vue from "vue";
import App from "./index.vue";

new Vue({
  render: (h) => h(App),
  el: "#root",
  mounted() {
    console.log('7777');
  },
});
