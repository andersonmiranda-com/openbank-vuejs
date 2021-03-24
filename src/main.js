import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import i18n from "./locales/i18n";

createApp(App)
  .use(i18n)
  .mount("#app");
