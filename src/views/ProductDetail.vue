<!-- Auteur : Rayan Chattaoui -->
<template>
  <div class="min-h-screen bg-[#FAFAFA]">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-6 py-4">
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
    <div class="max-w-6xl mx-auto px-6 py-12">
      <!-- Loading -->
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <span class="material-symbols-outlined animate-spin text-4xl text-slate-400">hourglass_empty</span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20">
        <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
        <p class="text-slate-500">{{ error }}</p>
      </div>

      <!-- Product Detail -->
      <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <!-- Image -->
        <div class="bg-white rounded-xl p-8 border border-slate-200">
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full max-h-[500px] object-contain"
          />
        </div>

        <!-- Infos -->
        <div class="space-y-6">
          <div>
            <span class="inline-block text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full mb-3">
              {{ product.category }}
            </span>
            <h1 class="text-3xl font-bold text-slate-900">
              {{ product.title }}
            </h1>
          </div>

          <p class="text-slate-500 leading-relaxed">
            {{ product.description }}
          </p>

          <div class="flex items-center gap-4">
            <p class="text-3xl font-bold text-primary">{{ product.price.toFixed(2) }}€</p>
            <div v-if="product.rating" class="flex items-center gap-1 text-sm text-slate-500">
              <span class="material-symbols-outlined text-yellow-500 text-lg">star</span>
              {{ product.rating.rate }} ({{ product.rating.count }} avis)
            </div>
          </div>

          <button
            @click="handleAddToCart"
            class="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined">shopping_cart</span>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchProductById } from "@/backend/service/productapi";
import { useCart } from "@/composables/useCart";
import type { Product } from "@/backend/type/products";

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();

const product = ref<Product | null>(null);
const isLoading = ref(true);
const error = ref("");

function goBack() {
  router.back();
}

function handleAddToCart() {
  if (!product.value) return;
  addToCart(product.value.id, 1);
  alert(`${product.value.title} ajouté au panier !`);
}

onMounted(async () => {
  const productId = Number(route.params.id);

  if (!productId) {
    error.value = "ID de produit invalide";
    isLoading.value = false;
    return;
  }

  try {
    product.value = await fetchProductById(productId);
    if (!product.value) {
      error.value = "Produit introuvable";
    }
  } catch {
    error.value = "Erreur lors du chargement du produit";
  } finally {
    isLoading.value = false;
  }
});
</script>
