import { createApp } from "vue";
import { createPinia } from "pinia";
import "normalize.css";
import "./assets/css/reset.less";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import registerIcons from "./global/register-icons";
// import store from './store' //引入 Vuex 状态管理
axios.defaults.baseURL = "http://localhost:8080";
const app = createApp(App);
app.use(registerIcons);
app.use(createPinia());
app.use(router);

app.mount("#app");
