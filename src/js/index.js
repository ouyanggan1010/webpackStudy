import "../css/iconfont.css";
import "../scss/style.scss";

import $ from "jquery";

$(".test").html("bbb");
import(/* webpackChunkName:'test' */ "./count").then(({ count }) => {
  console.log(count(78, 52));
});
