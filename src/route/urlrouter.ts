
// Auteur Thomas et Rayan
import { createRouter, createWebHistory } from "vue-router";
import Cards from "@/components/Cards.vue";
import Details from "@/components/details.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "cards",
      component: Cards,
    },
    {
      path: "/product/:id",
      name: "product-details",
      component: Details,
      props: true,
    },
  ],
});

export default router;
