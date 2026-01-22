<template>
  <!-- PAGE FULLSCREEN LOGIN -->
  <div class="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">

    <!-- ========================= -->
    <!-- COLONNE GAUCHE : BRANDING -->
    <!-- ========================= -->
    <div
      class="hidden md:flex flex-col justify-between p-12 lg:p-20
             bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950
             text-white relative overflow-hidden"
    >
      <!-- Gradient background -->
      <div class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent)]"></div>

      <div class="relative z-10">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center
                   backdrop-blur-sm border border-white/20"
          >
            <span class="material-symbols-outlined text-white">storefront</span>
          </div>
          <span class="text-white font-bold text-xl tracking-tight">ShopMinimal</span>
        </div>
      </div>

      <!-- Texte marketing -->
      <div class="relative z-10 max-w-md">
        <h1 class="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
          Une expérience simple. <br />
          <span class="text-blue-400">Un design minimal.</span>
        </h1>
        <p class="text-slate-300 text-lg font-light leading-relaxed">
          Gérez votre boutique avec une interface moderne, rapide et élégante.
          Accédez à vos produits, commandes et analytics en un clin d'œil.
        </p>
      </div>

      <div class="relative z-10">
        <p class="text-slate-400 text-sm font-medium">
          © 2025 — ShopMinimal Admin
        </p>
      </div>
    </div>

    <!-- ========================= -->
    <!-- COLONNE DROITE : FORMULAIRE -->
    <!-- ========================= -->
    <div
      class="flex-1 flex flex-col justify-center items-center px-6 py-12
             bg-background-light dark:bg-background-dark"
    >
      <div class="w-full max-w-md space-y-8">
        <!-- Retour -->
        <div>
          <button
            @click="goBack"
            class="inline-flex items-center gap-2 text-sm font-medium
                   text-slate-500 hover:text-accent transition-colors group"
          >
            <span class="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Retour à la boutique
          </button>
        </div>

        <!-- Titre -->
        <div class="space-y-2">
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connexion Admin
          </h2>
          <p class="text-slate-500 dark:text-slate-400">
            Ravi de vous revoir. Veuillez entrer vos identifiants.
          </p>
        </div>

        <!-- Formulaire -->
        <form class="space-y-6" @submit.prevent="submit">
          <!-- Username -->
          <div class="space-y-4">
            <div>
              <label
                class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                for="username"
              >
                Nom d'utilisateur
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-400 text-lg">person</span>
                </div>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  name="username"
                  placeholder="admin_shop"
                  required
                  class="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700
                         rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white
                         placeholder-slate-400 focus:ring-2 focus:ring-accent focus:border-transparent
                         transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="isLoading"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label
                  class="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  for="password"
                >
                  Mot de passe
                </label>
                <a
                  href="#"
                  class="text-xs font-semibold text-accent hover:underline"
                >
                  Oublié ?
                </a>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-400 text-lg">lock</span>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  placeholder="••••••••"
                  required
                  class="block w-full pl-11 pr-12 py-3 border border-slate-200 dark:border-slate-700
                         rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white
                         placeholder-slate-400 focus:ring-2 focus:ring-accent focus:border-transparent
                         transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="isLoading"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400
                         hover:text-slate-600 dark:hover:text-slate-200 transition"
                  :disabled="isLoading"
                >
                  <span class="material-symbols-outlined text-lg">
                    {{ showPassword ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Remember me -->
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              type="checkbox"
              name="remember-me"
              class="h-4 w-4 text-accent focus:ring-accent border-slate-300 dark:border-slate-700
                     rounded bg-white dark:bg-slate-800 disabled:opacity-50"
              :disabled="isLoading"
            />
            <label
              class="ml-2 block text-sm text-slate-600 dark:text-slate-400"
              for="remember-me"
            >
              Rester connecté
            </label>
          </div>

          <!-- Error message -->
          <div v-if="errorMessage" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center items-center py-3.5 px-4 border border-transparent
                   rounded-xl shadow-sm text-sm font-bold text-white
                   bg-primary hover:bg-slate-800 dark:bg-accent dark:hover:bg-blue-600
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent
                   transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="material-symbols-outlined animate-spin mr-2">
              hourglass_empty
            </span>
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <!-- Sign up link -->
        <div class="text-center pt-4">
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Pas encore de compte ?
            <button
              @click="goToInscription"
              class="font-bold text-slate-900 dark:text-white hover:text-accent transition-colors ml-1"
            >
              Créer un profil
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser, getStoredUser } from "@/backend/service/authapi";

const router = useRouter();

const username = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

/**
 * Soumission du formulaire
 */
const submit = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = "Veuillez remplir tous les champs";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const token = await loginUser({
      username: username.value,
      password: password.value,
    });

    if (token) {
      alert("Connexion réussie !");
      router.push("/admin");
    } else {
      errorMessage.value = "Identifiants invalides. Veuillez réessayer.";
    }
  } catch (error) {
    errorMessage.value = "Une erreur est survenue. Veuillez réessayer.";
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Navigation vers l'inscription
 */
const goToInscription = () => {
  router.push("/inscription");
};

/**
 * Retour à la boutique
 */
const goBack = () => {
  router.push("/");
};
</script>
