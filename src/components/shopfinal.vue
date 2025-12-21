<!-- Auteur : Rayan Chattaoui -->
<!-- Composant panier -->
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/40" @click="emit('close')" />
    <div class="relative z-50 w-full max-w-md bg-white h-full ml-auto">
      <p>Panier</p>
    </div>
  </div>
</template>
