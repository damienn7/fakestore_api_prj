<!-- Auteur : Rayan Chattaoui -->
<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined text-base">arrow_back</span>
          Retour
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-6 py-8">
      <!-- Loading -->
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <span class="material-symbols-outlined animate-spin text-4xl text-slate-400">hourglass_empty</span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
        <p class="text-slate-500">{{ error }}</p>
      </div>

      <!-- Cart Detail -->
      <div v-else-if="cart" class="space-y-6">
        <!-- Cart Header -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                Panier #{{ cart.id }}
              </h1>
              <p class="text-slate-500 mt-1">User ID: {{ cart.userId }}</p>
              <p class="text-slate-400 text-sm">{{ formatDate(cart.date) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-slate-500">Total produits</p>
              <p class="text-3xl font-bold text-primary">{{ cart.products.length }}</p>
            </div>
          </div>
        </div>

        <!-- Products List -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div class="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 class="font-semibold text-slate-900 dark:text-white">Produits du panier</h2>
          </div>

          <div class="divide-y divide-slate-200 dark:divide-slate-700">
            <div
              v-for="(product, index) in productsWithDetails"
              :key="index"
              class="p-4 flex items-center gap-4"
            >
              <img
                :src="product.image"
                :alt="product.title"
                class="w-16 h-16 object-contain bg-white rounded-lg border border-slate-200"
              />
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-slate-900 dark:text-white truncate">{{ product.title }}</h3>
                <p class="text-sm text-slate-500">{{ product.category }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-slate-900 dark:text-white">${{ product.price.toFixed(2) }}</p>
                <p class="text-sm text-slate-500">Qté: {{ product.quantity }}</p>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-b-xl flex items-center justify-between">
            <span class="font-semibold text-slate-900 dark:text-white">Total</span>
            <span class="text-xl font-bold text-primary">${{ totalPrice.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getsingle } from "@/backend/service/shopfinal";
import { fetchProductById } from "@/backend/service/productapi";
import type { Cart } from "@/backend/type/shop";
import type { Product } from "@/backend/type/products";

const route = useRoute();
const router = useRouter();

const cart = ref<Cart | null>(null);
const products = ref<Product[]>([]);
const isLoading = ref(true);
const error = ref("");

const productsWithDetails = computed(() => {
  if (!cart.value) return [];
  return cart.value.products.map((item, index) => ({
    ...products.value[index],
    quantity: item.quantity,
  }));
});

const totalPrice = computed(() => {
  return productsWithDetails.value.reduce((sum, p) => sum + (p.price || 0) * p.quantity, 0);
});

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function goBack() {
  router.back();
}

onMounted(async () => {
  const cartId = Number(route.params.id);

  if (!cartId) {
    error.value = "ID de panier invalide";
    isLoading.value = false;
    return;
  }

  try {
    cart.value = await getsingle(cartId);

    if (!cart.value) {
      error.value = "Panier introuvable";
      isLoading.value = false;
      return;
    }

    for (const item of cart.value.products) {
      const product = await fetchProductById(item.productId);
      if (product) {
        products.value.push(product);
      }
    }
  } catch (e) {
    error.value = "Erreur lors du chargement du panier";
  } finally {
    isLoading.value = false;
  }
});
</script>
