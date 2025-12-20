<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Cards from "./components/Cards.vue";

const onOpenCart = () => {
  console.log("Panier ouvert");
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <Navbar
      title="ShopMinimal"
      :has-items="true"
      @open-cart="onOpenCart"
    />

    <!-- Contenu principal -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <Cards />
    </main>
  </div>
</template>