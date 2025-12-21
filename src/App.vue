<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Shopfinal from "@/components/shopfinal.vue";
import { useCart } from "@/composables/useCart";

const route = useRoute();

const { hasItems } = useCart();
const isCartOpen = ref(false);

/**
 * Pages sans navbar (auth fullscreen)
 */
const noNavbarRoutes = ["/login", "/inscription"];

const showNavbar = computed(() => {
  return !noNavbarRoutes.includes(route.path);
});

const onOpenCart = () => {
  isCartOpen.value = true;
};

const onCloseCart = () => {
  isCartOpen.value = false;
};
</script>

<template>
  <!-- Layout GLOBAL -->
  <div class="min-h-screen w-full">

    <!-- NAVBAR uniquement si autorisée -->
    <Navbar
      v-if="showNavbar"
      title="ShopMinimal"
      :has-items="hasItems"
      @open-cart="onOpenCart"
    />

    <!-- ROUTES -->
    <router-view />

    <!-- CART MODAL -->
    <Shopfinal
      :open="isCartOpen"
      @close="onCloseCart"
    />
  </div>
</template>