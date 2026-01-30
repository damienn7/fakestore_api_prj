import { createRouter, createWebHistory } from "vue-router";
import Cards from "@/components/Cards.vue";
import Inscription from "@/views/inscription.vue";
import Connexion from "@/views/connexion.vue";
import Admin from "@/views/Admin.vue";
import CartDetail from "@/views/CartDetail.vue";
import { isAdmin, isAuthenticated } from "@/backend/service/authapi";

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
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated() && isAdmin()) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/cart/:id",
      name: "cart-detail",
      component: CartDetail,
    },
  ],
});

export default router;
