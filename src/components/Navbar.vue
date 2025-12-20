<template>
  <header
    class="flex items-center justify-between whitespace-nowrap
           border-b border-slate-200 bg-white px-6 py-4 z-10"
  >
    <div class="flex items-center gap-4">
      <div class="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
        <span class="material-symbols-outlined">storefront</span>
      </div>
      <h2 class="text-[#0d141c] text-xl font-bold tracking-tight">
        ShopMinimal
      </h2>
    </div>

    <div class="flex items-center gap-6">
      <label class="hidden sm:flex">
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="border rounded-lg px-3 h-9 text-sm"
        />
      </label>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
</script>
