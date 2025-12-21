<!-- Auteur : Rayan Chattaoui -->
<script setup lang="ts">
import { ref } from "vue";
import { useCart } from "@/composables/useCart";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { isEmpty, itemCount } = useCart();
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/40" @click="emit('close')" />
    <div class="relative z-50 w-full max-w-md bg-white h-full ml-auto p-6">
      <h2>Panier ({{ itemCount }})</h2>
      <p v-if="isEmpty">Panier vide</p>
    </div>
  </div>
</template>
