<!-- Auteur : Rayan Chattaoui -->
<script setup lang="ts">
import { ref, watch } from "vue";
import { useCart } from "@/composables/useCart";
import type { CartItemWithDetails } from "@/backend/type/shop";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const {
  itemCount,
  isEmpty,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartItemsWithDetails,
  getTotalPrice,
} = useCart();

const cartItemsWithDetails = ref<CartItemWithDetails[]>([]);
const isLoading = ref(false);
const totalPrice = ref(0);

watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return;
    isLoading.value = true;
    try {
      cartItemsWithDetails.value = await getCartItemsWithDetails();
      totalPrice.value = await getTotalPrice();
    } catch (error) {
      console.error("Erreur lors du chargement du panier :", error);
    } finally {
      isLoading.value = false;
    }
  }
);

async function increment(productId: number) {
  const item = cartItemsWithDetails.value.find((i) => i.productId === productId);
  if (item) {
    updateQuantity(productId, item.quantity + 1);
    cartItemsWithDetails.value = await getCartItemsWithDetails();
    totalPrice.value = await getTotalPrice();
  }
}

async function decrement(productId: number) {
  const item = cartItemsWithDetails.value.find((i) => i.productId === productId);
  if (item && item.quantity > 1) {
    updateQuantity(productId, item.quantity - 1);
    cartItemsWithDetails.value = await getCartItemsWithDetails();
    totalPrice.value = await getTotalPrice();
  }
}

async function removeItem(productId: number) {
  removeFromCart(productId);
  cartItemsWithDetails.value = await getCartItemsWithDetails();
  totalPrice.value = await getTotalPrice();
}

function handleClearCart() {
  if (confirm("Voulez-vous vraiment vider le panier ?")) {
    clearCart();
    cartItemsWithDetails.value = [];
    totalPrice.value = 0;
  }
}

function handleCheckout() {
  alert(`Checkout: ${itemCount.value} articles - Total: $${totalPrice.value.toFixed(2)}`);
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex justify-end">
    <div class="absolute inset-0 bg-black/40" @click="emit('close')" />
    <div class="relative z-50 w-full max-w-md bg-white shadow-2xl flex flex-col h-full">
      <div class="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary">shopping_bag</span>
          <h2 class="text-xl font-bold text-[#0d141c]">Panier ({{ itemCount }})</h2>
        </div>
        <button @click="emit('close')" class="text-slate-400 hover:text-slate-700 text-xl">✕</button>
      </div>

      <div v-if="isLoading" class="flex-1 flex items-center justify-center text-slate-400">
        Chargement du panier…
      </div>

      <div v-else-if="isEmpty" class="flex-1 flex flex-col items-center justify-center text-slate-400 px-6">
        <span class="material-symbols-outlined text-6xl mb-4">shopping_cart</span>
        <p class="text-lg">Votre panier est vide</p>
      </div>

      <div v-else class="flex-1 overflow-y-auto px-6 py-4">
        <div class="space-y-4">
          <div v-for="item in cartItemsWithDetails" :key="item.productId" class="flex gap-4 p-4 bg-slate-50 rounded-lg">
            <img :src="item.image" :alt="item.title" class="w-20 h-20 object-contain bg-white rounded"/>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-sm text-[#0d141c] mb-1 truncate">{{ item.title }}</h3>
              <p class="text-xs text-slate-500 mb-2">{{ item.category }}</p>
              <p class="font-bold text-sm">\${{ item.price.toFixed(2) }}</p>
            </div>
            <div class="flex flex-col items-end justify-between">
              <button @click="removeItem(item.productId)" class="text-slate-400 hover:text-red-500 transition">
                <span class="material-symbols-outlined text-sm">close</span>
              </button>
              <div class="flex items-center gap-2">
                <button @click="decrement(item.productId)" class="w-6 h-6 flex items-center justify-center rounded bg-slate-200 hover:bg-slate-300 transition" :disabled="item.quantity <= 1">
                  <span class="material-symbols-outlined text-sm">remove</span>
                </button>
                <span class="w-8 text-center font-semibold text-sm">{{ item.quantity }}</span>
                <button @click="increment(item.productId)" class="w-6 h-6 flex items-center justify-center rounded bg-slate-200 hover:bg-slate-300 transition">
                  <span class="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isEmpty && !isLoading" class="border-t border-slate-200 px-6 py-4 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold text-[#0d141c]">Total</span>
          <span class="text-2xl font-bold text-primary">\${{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="space-y-2">
          <button @click="handleCheckout" class="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition">
            Commander
          </button>
          <button @click="handleClearCart" class="w-full py-2 text-slate-500 hover:text-red-500 text-sm transition">
            Vider le panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
