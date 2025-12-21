<!-- Auteur : Thomas et Rayan -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchProducts } from "@/backend/service/productapi";
import type { Product } from "@/backend/type/products";
import Details from "@/components/details.vue";
import { useCart } from "@/composables/useCart";

/**
 * State
 */
const viewMode = ref<"grid" | "list">("grid");
const products = ref<Product[]>([]);
const isLoading = ref(true);

/**
 * Modal state
 */
const selectedProductId = ref<number | null>(null);
const isDetailsOpen = ref(false);

const { addToCart } = useCart();

/**
 * Lifecycle
 */
onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } finally {
    isLoading.value = false;
  }
});

/**
 * Methods
 */
const openDetails = (id: number) => {
  selectedProductId.value = id;
  isDetailsOpen.value = true;
};

const closeDetails = () => {
  isDetailsOpen.value = false;
  selectedProductId.value = null;
};

function handleAddToCart(product: Product, event: Event) {
  event.stopPropagation();
  addToCart(product.id, 1);
  alert(`${product.title} ajouté au panier !`);
}
</script>

<template>
  <section class="flex-1 flex flex-col bg-[#FAFAFA] overflow-hidden">
    <!-- Header -->
    <div
      class="px-6 py-5 flex items-center justify-between
             bg-[#FAFAFA]/90 backdrop-blur-sm
             sticky top-0 z-10 border-b border-slate-200"
    >
      <h2 class="text-[#0d141c] text-xl font-bold tracking-tight">
        {{ viewMode === "grid" ? "Grid View" : "List View" }}
      </h2>

      <!-- Toggle icons -->
      <div class="hidden md:flex h-9 items-center rounded-lg bg-slate-200 p-1 gap-1">
        <!-- Grid -->
        <button
          @click="viewMode = 'grid'"
          :class="[
            'h-full w-9 flex items-center justify-center rounded transition',
            viewMode === 'grid'
              ? 'bg-white shadow-sm text-primary'
              : 'text-slate-500 hover:text-slate-700'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 6h6v6H4V6zm10 0h6v6h-6V6zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
          </svg>
        </button>

        <!-- List -->
        <button
          @click="viewMode = 'list'"
          :class="[
            'h-full w-9 flex items-center justify-center rounded transition',
            viewMode === 'list'
              ? 'bg-white shadow-sm text-primary'
              : 'text-slate-500 hover:text-slate-700'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="flex-1 flex items-center justify-center text-slate-400"
    >
      Chargement des produits…
    </div>

    <!-- GRID VIEW -->
    <div v-else-if="viewMode === 'grid'" class="flex-1 overflow-y-auto p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        <div
          v-for="product in products"
          :key="product.id"
          @click="openDetails(product.id)"
          class="bg-white rounded-xl border border-slate-100 p-4
                 hover:shadow-md transition cursor-pointer"
        >
          <img
            :src="product.image"
            class="h-40 w-full object-contain mb-3"
          />
          <h3 class="font-bold text-[#0d141c] mb-1">
            {{ product.title }}
          </h3>
          <p class="mt-2 font-bold">
            ${{ product.price }}
          </p>
        </div>
      </div>
    </div>

    <!-- LIST VIEW -->
    <div v-else class="flex-1 overflow-y-auto p-6">
      <div class="flex flex-col gap-4 pb-10">
        <div
          v-for="product in products"
          :key="product.id"
          @click="openDetails(product.id)"
          class="flex items-center gap-4 p-4 bg-white rounded-xl
                 border border-slate-100 hover:shadow-md transition cursor-pointer"
        >
          <img
            :src="product.image"
            class="w-24 h-24 object-contain bg-slate-50 rounded"
          />
          <div class="flex-1">
            <h3 class="font-bold text-[#0d141c] mb-1">
              {{ product.title }}
            </h3>
          </div>
          <p class="font-bold">
            ${{ product.price }}
          </p>
        </div>
      </div>
    </div>

    <!-- DETAILS MODAL -->
    <Details
      :open="isDetailsOpen"
      :product-id="selectedProductId"
      @close="closeDetails"
    />
  </section>
</template>