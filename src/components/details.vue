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

    if (isNaN(id)) {
      throw new Error("ID invalide");
    }

    product.value = await fetchProductById(id);

    if (!product.value) {
      throw new Error("Produit introuvable");
    }
  } catch (error) {
    console.error(error);
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
      Erreur lors du chargement du produit
    </div>

    <div
      v-else-if="product"
      class="max-w-4xl mx-auto bg-white rounded-xl p-6"
    >
      <h1 class="text-2xl font-bold text-[#0d141c]">
        {{ product.title }}
      </h1>
    </div>
  </section>
</template>