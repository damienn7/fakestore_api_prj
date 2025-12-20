<script setup lang="ts">
import Navbar from './components/Navbar.vue'
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
    <main class="flex-1 bg-gray-50 p-6">
      <h1 class="text-2xl font-bold">
        Home – UI Statique
      </h1>
      <p class="text-gray-500 mt-2">
        Contenu à venir…
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
const onOpenCart = () => {
  console.log('Panier ouvert')
}
</script>

<style scoped>
</style>
