<!-- Auteur : Thomas et Rayan -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchProducts } from "@/backend/service/productapi";
import type { Product } from "@/backend/type/products";

const viewMode = ref<"grid" | "list">("grid");
const products = ref<Product[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  products.value = await fetchProducts();
  isLoading.value = false;
});
</script>

<template>
  <section class="flex-1 flex flex-col bg-[#FAFAFA] overflow-hidden">
    <div
      class="px-6 py-5 flex items-center justify-between
             bg-[#FAFAFA]/90 backdrop-blur-sm
             sticky top-0 z-10 border-b border-slate-200"
    >
      <h2 class="text-[#0d141c] text-xl font-bold tracking-tight">
        {{ viewMode === "grid" ? "Grid View" : "List View" }}
      </h2>

      <div class="hidden md:flex h-8 items-center rounded-lg bg-slate-200 p-1 gap-1">
        <button
          @click="viewMode = 'grid'"
          class="px-3 h-full rounded text-xs"
          :class="viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'"
        >
          Grid
        </button>
        <button
          @click="viewMode = 'list'"
          class="px-3 h-full rounded text-xs"
          :class="viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'"
        >
          List
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="flex-1 flex items-center justify-center text-slate-400">
      Chargement des produits…
    </div>

    <div v-else-if="viewMode === 'grid'" class="flex-1 overflow-y-auto p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-xl border border-slate-100 p-4"
        >
          <img :src="product.image" class="h-40 w-full object-contain mb-3" />
          <h3 class="font-bold text-[#0d141c] line-clamp-1">{{ product.title }}</h3>
          <p class="text-sm text-slate-500 line-clamp-2">{{ product.description }}</p>
          <p class="mt-2 font-bold">${{ product.price }}</p>
        </div>
      </div>
    </div>

    <div v-else class="flex-1 flex items-center justify-center text-slate-400">
      List view à venir…
    </div>
  </section>
</template>
