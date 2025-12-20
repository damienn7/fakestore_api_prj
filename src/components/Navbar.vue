<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title?: string;
  hasItems?: boolean;
}>();

const emit = defineEmits<{
  (e: "open-cart"): void;
}>();

const searchQuery = ref("");
</script>

<template>
  <nav
    class="w-screen flex items-center justify-between
           border-b border-slate-200 bg-white
           px-6 py-4 sticky top-0 z-50"
  >
    <!-- LEFT -->
    <div class="flex items-center gap-4">
      <div class="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
        <span class="material-symbols-outlined">storefront</span>
      </div>
      <h2 class="text-xl font-bold tracking-tight text-slate-900">
        {{ title || "ShopMinimal" }}
      </h2>
    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-6">
      <!-- Search -->
      <label class="hidden sm:flex w-64 h-10">
        <div
          class="flex w-full h-full items-center rounded-lg
                 border border-slate-200 bg-slate-50
                 focus-within:ring-2 focus-within:ring-primary/20"
        >
          <span class="material-symbols-outlined text-slate-400 pl-3 text-[20px]">
            search
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="flex-1 bg-transparent px-3 text-sm
                   placeholder:text-slate-400
                   focus:outline-none"
          />
        </div>
      </label>

      <!-- Cart -->
      <button
        @click="emit('open-cart')"
        class="relative size-10 rounded-lg bg-slate-100
               hover:bg-slate-200 transition
               flex items-center justify-center"
      >
        <span class="material-symbols-outlined">shopping_bag</span>
        <span
          v-if="hasItems"
          class="absolute top-2 right-2 size-2 bg-primary rounded-full"
        ></span>
      </button>
    </div>
  </nav>
</template>