<script setup lang="ts">
import Navbar from "./components/Navbar.vue";

const onOpenCart = () => {
  console.log("Panier ouvert");
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar full width -->
    <Navbar
      title="ShopMinimal"
      :has-items="true"
      @open-cart="onOpenCart"
    />

    <!-- Contenu principal -->
    <main class="flex-1 px-6 py-10">
      <h1 class="text-3xl font-bold mb-2">Home – UI Statique</h1>
      <p class="text-slate-500">Contenu à venir…</p>
    </main>
  </div>
</template>
