<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div>
        <h1 class="text-3xl font-black text-slate-900">
          Inscription
        </h1>
        <p class="text-slate-500">
          Crée ton compte
        </p>
      </div>

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
          type="submit"
          class="w-full h-11 rounded-lg bg-blue-600 text-white font-medium"
        >
          Créer un compte
        </button>
      </form>
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
  }
};
</script>