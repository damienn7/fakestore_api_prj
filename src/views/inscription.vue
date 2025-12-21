<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div
      class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2
             bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <!-- Colonne gauche : Dégradé -->
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
          © 2025 — Projet ShopMinimal
        </p>
      </div>

      <!-- Colonne droite : Formulaire -->
      <div class="flex flex-col justify-center p-8 sm:p-12">
        <div class="max-w-md mx-auto space-y-6">
          <h1 class="text-3xl font-black text-slate-900">
            Inscription
          </h1>

          <form class="space-y-4" @submit.prevent="submit">
            <!-- Email -->
            <input
              v-model="email"
              type="email"
              required
              placeholder="Email"
              class="w-full h-11 rounded-lg border border-slate-300 px-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <!-- Mot de passe -->
            <input
              v-model="password"
              type="password"
              required
              placeholder="Mot de passe"
              class="w-full h-11 rounded-lg border border-slate-300 px-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <!-- Confirmation -->
            <input
              v-model="confirmPassword"
              type="password"
              required
              placeholder="Confirmation"
              class="w-full h-11 rounded-lg border border-slate-300 px-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <!-- Bouton -->
            <button
              type="submit"
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
import { registerUser } from "@/backend/service/register";

// State
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Submit
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
    // plus tard : router.push("/login")
  } else {
    alert("Erreur lors de l’inscription");
  }
};
</script>