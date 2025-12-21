<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";

const onOpenCart = () => {
  console.log("Panier ouvert");
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar toujours visible -->
    <Navbar
      title="ShopMinimal"
      :has-items="true"
      @open-cart="onOpenCart"
    />

    <!-- LES PAGES S’AFFICHENT ICI -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <router-view />
    </main>
  </div>
</template>
