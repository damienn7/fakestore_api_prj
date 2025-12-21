<!-- Auteur : Thomas et Rayan -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchProductById } from "@/backend/service/productapi";
import type { Product } from "@/backend/type/products";

const route = useRoute();

const product = ref<Product | null>(null);
const isLoading = ref(true);
const hasError = ref(false);

onMounted(async () => {
  try {
    const id = Number(route.params.id);
    product.value = await fetchProductById(id);
    if (!product.value) throw new Error();
  } catch {
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="min-h-screen bg-[#FAFAFA] p-6">
    <div v-if="isLoading" class="text-center text-slate-400">
      Chargement du produit…
    </div>

    <div v-else-if="hasError" class="text-center text-red-500">
      Produit introuvable
    </div>

    <div
      v-else-if="product"
      class="max-w-4xl mx-auto bg-white rounded-xl p-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          :src="product.image"
          class="max-h-80 mx-auto object-contain"
        />

        <div>
          <h1 class="text-2xl font-bold mb-2">
            {{ product.title }}
          </h1>
          <p class="text-slate-500 mb-4">
            {{ product.description }}
          </p>
          <p class="font-bold text-lg">
            ${{ product.price }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
