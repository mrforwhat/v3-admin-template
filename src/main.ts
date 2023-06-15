import { createApp } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from "./router/index";
import pinia from '@/stores'
import "./style.css";
import "scss-flex";
import App from "./App.vue";
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(pinia).mount("#app");
