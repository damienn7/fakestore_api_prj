<template>
  <!-- PAGE FULLSCREEN -->
  <div class="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">

    <!-- ========================= -->
    <!-- COLONNE GAUCHE : BRANDING -->
    <!-- ========================= -->
    <div
      class="hidden lg:flex flex-col justify-between p-16
             bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950
             text-white"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div
          class="size-10 flex items-center justify-center
                 rounded-lg bg-white/10 backdrop-blur"
        >
          <span class="material-symbols-outlined text-white">
            storefront
          </span>
        </div>
        <span class="text-xl font-bold tracking-tight">
          ShopMinimal
        </span>
      </div>

      <!-- Texte marketing -->
      <div class="max-w-md space-y-4">
        <h2 class="text-4xl font-bold leading-tight">
          Une expérience simple.<br />
          Un design minimal.
        </h2>
        <p class="text-slate-300">
          Crée ton compte et profite d’une boutique moderne,
          rapide et élégante.
        </p>
      </div>

      <p class="text-sm text-slate-400">
        © 2025 — ShopMinimal
      </p>
    </div>

    <!-- ========================= -->
    <!-- COLONNE DROITE : FORMULAIRE -->
    <!-- ========================= -->
    <div class="flex w-full items-center justify-center bg-slate-50 px-6 py-12">
      <div class="w-full max-w-md space-y-6">

        <!-- Retour -->
        <button
          @click="goBack"
          class="flex items-center gap-2 text-sm text-slate-500
                 hover:text-slate-800 transition w-fit"
        >
          <span class="material-symbols-outlined text-[20px]">
            arrow_back
          </span>
          Retour à la boutique
        </button>

        <!-- Titre -->
        <div class="space-y-2">
          <h1 class="text-3xl font-black text-slate-900">
            Inscription
          </h1>
          <p class="text-slate-500">
            Crée ton compte ShopMinimal
          </p>
        </div>

        <!-- Formulaire -->
        <form class="space-y-4" @submit.prevent="submit">
          <input
            v-model="email"
            type="email"
            required
            placeholder="Email"
            class="w-full h-12 rounded-lg border border-slate-300 px-3
                   focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            v-model="password"
            type="password"
            required
            placeholder="Mot de passe"
            class="w-full h-12 rounded-lg border border-slate-300 px-3
                   focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            v-model="confirmPassword"
            type="password"
            required
            placeholder="Confirmation du mot de passe"
            class="w-full h-12 rounded-lg border border-slate-300 px-3
                   focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            class="w-full h-12 rounded-lg bg-primary
                   text-white font-medium
                   hover:bg-blue-600 transition"
          >
            Créer un compte
          </button>
        </form>

        <!-- Lien login -->
        <p class="text-sm text-center text-slate-500">
          Déjà un compte ?
          <button
            @click="goToLogin"
            class="text-primary font-medium hover:underline ml-1"
          >
            Se connecter
          </button>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "@/backend/service/register";

const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const submit = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }

  const success = await registerUser({
    email: email.value,
    password: password.value,
  });

  if (success) {
    alert("Compte créé avec succès");
    router.push("/connexion");
  } else {
    alert("Erreur lors de l’inscription");
  }
};

const goBack = () => {
  router.push("/");
};

const goToLogin = () => {
  router.push("/connexion");
};
</script>