<template>
  <header
    class="flex items-center justify-between whitespace-nowrap
           border-b border-slate-200 bg-white px-6 py-4 z-10"
  >
    <!-- Logo -->
    <div class="flex items-center gap-4">
      <div class="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
        <span class="material-symbols-outlined">storefront</span>
      </div>
      <h2 class="text-[#0d141c] text-xl font-bold tracking-tight">
        {{ title }}
      </h2>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-6">
      <label class="hidden sm:flex">
        <input
          v-model="search"
          type="text"
          placeholder="Search products..."
          class="border rounded-lg px-3 h-9 text-sm"
        />
      </label>

      <button
        class="relative size-10 rounded-lg bg-slate-100 hover:bg-slate-200"
        @click="$emit('open-cart')"
      >
        <span class="material-symbols-outlined">shopping_bag</span>
        <span
          v-if="hasItems"
          class="absolute top-2 right-2 size-2 bg-primary rounded-full"
        ></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  title: {
    type: String,
    default: "ShopMinimal",
  },
  hasItems: {
    type: Boolean,
    default: false,
  },
});

const search = ref("");
</script>
