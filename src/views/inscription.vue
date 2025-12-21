<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div
      class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2
             bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <!-- Dégradé -->
      <div
        class="hidden md:flex flex-col justify-between p-10
               bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600
               text-white"
      >
        <div>
          <h2 class="text-3xl font-extrabold mb-4">
            Bienvenue
          </h2>
          <p class="text-blue-100">
            Crée ton compte pour accéder à la plateforme.
          </p>
        </div>

        <p class="text-sm text-blue-200">
          © 2025 — Projet Vue.js
        </p>
      </div>

      <!-- Formulaire -->
      <div class="flex flex-col justify-center p-8 sm:p-12">
        <div class="max-w-md mx-auto space-y-6">
          <h1 class="text-3xl font-black text-slate-900">
            Inscription
          </h1>

          <form class="space-y-4" @submit.prevent="submit">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full h-11 rounded-lg border border-slate-300 px-3"
            />

            <input
              v-model="password"
              type="password"
              placeholder="Mot de passe"
              class="w-full h-11 rounded-lg border border-slate-300 px-3"
            />

            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirmation"
              class="w-full h-11 rounded-lg border border-slate-300 px-3"
            />

            <button
              class="w-full h-11 rounded-lg bg-blue-600 text-white font-medium
                     hover:bg-blue-700 transition"
            >
              Créer un compte
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const submit = () => {
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }

  console.log("Register:", email.value);
};
</script>