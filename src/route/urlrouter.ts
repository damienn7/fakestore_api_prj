import { createRouter, createWebHistory } from "vue-router";
import Cards from "@/components/Cards.vue";
import Inscription from "@/views/inscription.vue";
import Connexion from "@/views/connexion.vue";

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
    {
      path: "/connexion",
      name: "connexion",
      component: Connexion,
    },
  ],
});

export default router;
