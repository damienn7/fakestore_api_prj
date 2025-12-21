// Auteur: Rayan Chattaoui
// Composable pour la gestion du panier
// Version 1.0.0

import { ref } from "vue";
import type { CartItem } from "@/backend/type/shop";

const cartItems = ref<CartItem[]>([]);

export function useCart() {

  function addToCart(productId: number, quantity: number = 1) {
    cartItems.value.push({ productId, quantity });
  }

  return {
    cartItems,
    addToCart
  };
}
