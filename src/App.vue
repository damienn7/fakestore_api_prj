<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";

const route = useRoute();

/**
 * Pages sans navbar (auth fullscreen)
 */
const noNavbarRoutes = ["/login", "/inscription"];

const showNavbar = computed(() => {
  return !noNavbarRoutes.includes(route.path);
});

const onOpenCart = () => {
  console.log("Panier ouvert");
};
</script>

<template>
  <!-- Layout GLOBAL -->
  <div class="min-h-screen w-full">

    <!-- NAVBAR uniquement si autorisée -->
    <Navbar
      v-if="showNavbar"
      title="ShopMinimal"
      :has-items="true"
      @open-cart="onOpenCart"
    />

    <!-- ROUTES -->
    <router-view />
  </div>
</template>