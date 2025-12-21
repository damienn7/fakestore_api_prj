<!-- Auteur : Thomas et Rayan -->
<script setup lang="ts">
import { ref, watch } from "vue";
import { fetchProductById } from "@/backend/service/productapi";
import type { Product } from "@/backend/type/products";
import { useCart } from "@/composables/useCart";

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

/**
 * State
 */
const product = ref<Product | null>(null);
const isLoading = ref(false);
const hasError = ref(false);

const { addToCart } = useCart();

/**
 * Charger le produit quand la popup s'ouvre
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

function handleAddToCart() {
  if (!product.value) return;
  addToCart(product.value.id, 1);
  alert(`${product.value.title} ajouté au panier !`);
}
</script>

<template>
  <!-- Overlay + centrage -->
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black/40"
      @click="emit('close')"
    />

    <!-- Modal -->
    <div
      class="relative z-50 w-full max-w-4xl bg-white rounded-2xl p-8
             shadow-xl mx-4"
    >
      <!-- Bouton fermer -->
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 text-slate-400
               hover:text-slate-700 text-xl"
        aria-label="Fermer"
      >
        ✕
      </button>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center text-slate-400 py-20">
        Chargement du produit…
      </div>

      <!-- Error -->
      <div v-else-if="hasError" class="text-center text-red-500 py-20">
        Impossible de charger le produit
      </div>

      <!-- Content -->
      <div
        v-else-if="product"
        class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <!-- Image -->
        <div class="flex justify-center">
          <img
            :src="product.image"
            :alt="product.title"
            class="max-h-96 object-contain"
          />
        </div>

        <!-- Infos -->
        <div>
          <h1 class="text-2xl font-bold text-[#0d141c] mb-4">
            {{ product.title }}
          </h1>

          <p class="text-slate-500 mb-6 leading-relaxed">
            {{ product.description }}
          </p>

          <p class="text-xl font-bold mb-4">
            Prix : ${{ product.price }}
          </p>

          <span
            class="inline-block text-xs bg-slate-100 text-slate-600
                   px-4 py-1 rounded-full"
          >
            {{ product.category }}
          </span>
        </div>
      </div>


<button
  @click="handleAddToCart"
  :disabled="!product"
  class="absolute bottom-6 right-6
         w-14 h-14
         flex items-center justify-center
         rounded-lg
         text-white bg-primary
         hover:bg-primary/90
         disabled:bg-slate-300 disabled:cursor-not-allowed
         transition border-none
         shadow-md hover:shadow-lg"
  aria-label="Ajouter au panier"
>
  <span class="material-symbols-outlined text-2xl">
    shopping_cart
  </span>
</button>
    </div>
  </div>
</template>
