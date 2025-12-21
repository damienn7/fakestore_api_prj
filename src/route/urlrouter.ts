import { createRouter, createWebHistory } from "vue-router";
import Cards from "@/components/Cards.vue";
import Inscription from "@/views/inscription.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Cards,
    },
    {
      path: "/inscription",
      name: "inscription",
      component: Inscription,
    },
  ],
});

export default router;
