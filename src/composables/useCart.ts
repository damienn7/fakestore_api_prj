// Auteur: Rayan Chattaoui
// Composable pour la gestion du panier
// Version 1.0.0

import { ref, computed } from "vue";
import type { CartItem, CartItemWithDetails } from "@/backend/type/shop";
import { fetchProductById } from "@/backend/service/productapi";

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

  async function getCartItemsWithDetails(): Promise<CartItemWithDetails[]> {
    const itemsWithDetails: CartItemWithDetails[] = [];

    for (const item of cartItems.value) {
      const product = await fetchProductById(item.productId);

      if (product) {
        itemsWithDetails.push({
          productId: item.productId,
          quantity: item.quantity,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        });
      }
    }

    return itemsWithDetails;
  }

  async function getTotalPrice(): Promise<number> {
    const items = await getCartItemsWithDetails();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function isInCart(productId: number): boolean {
    return cartItems.value.some((item) => item.productId === productId);
  }

  function getQuantity(productId: number): number {
    const item = cartItems.value.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  }

  return {
    cartItems: computed(() => cartItems.value),
    itemCount,
    isEmpty,
    hasItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartItemsWithDetails,
    getTotalPrice,
    isInCart,
    getQuantity
  };
}
