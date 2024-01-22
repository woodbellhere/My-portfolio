import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router";
import elementPlus from "element-plus";
import "element-plus/dist/index.css";
const app = createApp(App);

app.use(router);
app.use(elementPlus);

const whiteList = ["/"];
router.beforeEach((to, from, next) => {
  // if (whiteList.includes(to.path) || localStorage.getItem("token")) {
  //   next();
  // } else {
  //   next("/");
  // }
  console.log(to);
  document.title = to.meta.title;
  next();
});

router.afterEach((to, from) => {});
app.mount("#app");
