// Auteur: Rayan Chattaoui
// Composable pour la gestion du panier
// Version 1.0.0

import { ref, computed } from "vue";
import type { CartItem } from "@/backend/type/shop";

const cartItems = ref<CartItem[]>([]);

export function useCart() {

  function addToCart(productId: number, quantity: number = 1) {
    const existingItem = cartItems.value.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.value.push({ productId, quantity });
    }

    saveToStorage();
  }

  function removeFromCart(productId: number) {
    cartItems.value = cartItems.value.filter(
      (item) => item.productId !== productId
    );
    saveToStorage();
  }

  function clearCart() {
    cartItems.value = [];
    saveToStorage();
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = cartItems.value.find((item) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      saveToStorage();
    }
  }

  return {
    cartItems: computed(() => cartItems.value),
    itemCount,
    isEmpty,
    hasItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity
  };
}
