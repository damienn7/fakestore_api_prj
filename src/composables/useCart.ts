// Auteur: Rayan Chattaoui
// Composable pour la gestion du panier
// Version 1.0.0

import { ref, computed } from "vue";
import type { CartItem, CartItemWithDetails } from "@/backend/type/shop";
import { fetchProductById } from "@/backend/service/productapi";
import {
  fetchLoggedInUserCartById,
  fetchLoggedInUserCarts,
  getStoredUserId,
} from "@/backend/service/authapi";
import { updatecards, addcards, deletecards } from "@/backend/service/shopfinal";

const CART_STORAGE_KEY = "fakestore_cart";
const CART_ID_STORAGE_KEY = "fakestore_cart_id";
const cartItems = ref<CartItem[]>([]);
const isInitialized = ref(false);
const cartId = ref<number | null>(null);

function initializeCart() {
  if (isInitialized.value) return;

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      cartItems.value = JSON.parse(stored);
    }

    const storedCartId = localStorage.getItem(CART_ID_STORAGE_KEY);
    if (storedCartId) {
      const parsed = Number(storedCartId);
      cartId.value = Number.isFinite(parsed) ? parsed : null;
    }
  } catch (error) {
    console.error("Erreur lors du chargement du panier :", error);
    cartItems.value = [];
    cartId.value = null;
  }

  isInitialized.value = true;
}

function saveToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value));
    if (cartId.value !== null) {
      localStorage.setItem(CART_ID_STORAGE_KEY, String(cartId.value));
    } else {
      localStorage.removeItem(CART_ID_STORAGE_KEY);
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du panier :", error);
  }
}

export function useCart() {
  initializeCart();

  async function syncCartFromApi(): Promise<void> {
    const userId = getStoredUserId();
    if (userId === null) return;

    try {
      const carts = await fetchLoggedInUserCarts();
      if (carts.length === 0) return;

      const candidateIds = carts.map((c) => c.id).filter((id) => typeof id === "number");
      const preferredId =
        cartId.value !== null && candidateIds.includes(cartId.value)
          ? cartId.value
          : Math.max(...candidateIds);

      const cart = await fetchLoggedInUserCartById(preferredId);
      if (!cart) return;

      cartId.value = cart.id;
      cartItems.value = cart.products;
      saveToStorage();
    } catch (error) {
      console.error("Erreur lors de la synchronisation du panier :", error);
    }
  }

  const itemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const isEmpty = computed(() => cartItems.value.length === 0);
  const hasItems = computed(() => !isEmpty.value);

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

    void persistCartToApi();
  }

  function clearCart() {
    cartItems.value = [];
    saveToStorage();

    void persistCartToApi();
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

      void persistCartToApi();
    }
  }

  async function persistCartToApi(): Promise<void> {
    const userId = getStoredUserId();
    if (userId === null || cartId.value === null) return;

    await updatecards(cartId.value, {
      userId,
      date: new Date().toISOString(),
      products: cartItems.value,
    });
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

  async function createCart(products: CartItem[] = []): Promise<number | null> {
    const userId = getStoredUserId();
    if (userId === null) return null;

    const newCart = await addcards({
      userId,
      date: new Date().toISOString(),
      products,
    });

    if (newCart) {
      cartId.value = newCart.id;
      cartItems.value = products;
      saveToStorage();
      return newCart.id;
    }

    return null;
  }

  async function deleteCart(id: number): Promise<boolean> {
    const success = await deletecards(id);

    if (success && cartId.value === id) {
      cartId.value = null;
      cartItems.value = [];
      saveToStorage();
    }

    return success;
  }

  return {
    cartItems: computed(() => cartItems.value),
    cartId: computed(() => cartId.value),
    itemCount,
    isEmpty,
    hasItems,
    syncCartFromApi,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartItemsWithDetails,
    getTotalPrice,
    isInCart,
    getQuantity,
    createCart,
    deleteCart
  };
}
