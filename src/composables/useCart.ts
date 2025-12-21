// Auteur: Rayan Chattaoui
// Composable pour la gestion du panier
// Version 1.0.0

import { ref } from "vue";

const cartItems = ref([]);

export function useCart() {
  return {
    cartItems,
  };
}
