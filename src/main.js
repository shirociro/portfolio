import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./core/router";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
const queryClient = new QueryClient();
//  Plugins
import BootstrapVue3 from "bootstrap-vue-3";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
//  Global Styles
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "primeicons/primeicons.css";
import "./assets/css/main.css";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.use(BootstrapVue3);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
  },
});

router.isReady().then(() => {
  app.mount("#app");
});
