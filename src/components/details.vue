<!-- Auteur : Thomas et Rayan -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchProductById } from "@/backend/service/productapi";
import type { Product } from "@/backend/type/products";

const route = useRoute();
const product = ref<Product | null>(null);

onMounted(async () => {
  const id = Number(route.params.id);
  product.value = await fetchProductById(id);
});
</script>

<template>
  <section class="min-h-screen bg-[#FAFAFA] p-6">
    <div class="max-w-4xl mx-auto bg-white rounded-xl p-6">
      <h1 class="text-2xl font-bold text-[#0d141c] mb-4">
        {{ product?.title }}
      </h1>
    </div>
  </section>
</template>
