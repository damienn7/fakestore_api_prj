<!-- Auteur : Thomas et Rayan -->
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { fetchProductById } from "@/backend/service/productapi";
import type { Product } from "@/backend/type/products";

/**
 * Props
 */
const props = defineProps<{
  productId: number | null;
  open: boolean;
}>();

/**
 * Emit
 */
const emit = defineEmits<{
  (e: "close"): void;
}>();

const product = ref<Product | null>(null);
const isLoading = ref(false);
const hasError = ref(false);

/**
 * Charger le produit quand la popup s’ouvre
 */
watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen || props.productId === null) return;

    isLoading.value = true;
    hasError.value = false;

    try {
      product.value = await fetchProductById(props.productId);
      if (!product.value) throw new Error();
    } catch {
      hasError.value = true;
    } finally {
      isLoading.value = false;
    }
  }
);
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50">
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black/40"
      @click="emit('close')"
    />

    <!-- Modal -->
    <div
      class="relative z-50 max-w-4xl mx-auto mt-20 bg-white rounded-xl p-6"
    >
      <!-- Close -->
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 text-slate-500 hover:text-black"
      >
        ✕
      </button>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center text-slate-400">
        Chargement du produit…
      </div>

      <!-- Error -->
      <div v-else-if="hasError" class="text-center text-red-500">
        Impossible de charger le produit
      </div>

      <!-- Content -->
      <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          :src="product.image"
          :alt="product.title"
          class="max-h-80 mx-auto object-contain"
        />

        <div>
          <h1 class="text-2xl font-bold mb-2">
            {{ product.title }}
          </h1>

          <p class="text-slate-500 mb-4">
            {{ product.description }}
          </p>

          <p class="text-lg font-bold mb-2">
            Prix : ${{ product.price }}
          </p>

          <span class="text-xs bg-slate-100 px-3 py-1 rounded-full">
            {{ product.category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>