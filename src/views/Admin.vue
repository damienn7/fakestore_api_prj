<template>
  <!-- ADMIN DASHBOARD FULLSCREEN -->
  <div class="min-h-screen w-full bg-background-light dark:bg-background-dark transition-colors duration-200">
    <!-- TOP NAVIGATION -->
    <header
      class="sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-[#f0f2f4]
             dark:border-white/10 px-6 py-3 flex items-center justify-between"
    >
      <div class="flex items-center gap-4">
        <!-- Logo -->
        <div class="size-8 text-primary">
          <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
            ></path>
          </svg>
        </div>
        <h1 class="text-lg font-bold tracking-tight">
          ShopMinimal <span class="text-primary">DevPanel</span>
        </h1>
      </div>

      <!-- RIGHT SECTION -->
      <div class="flex items-center gap-6">
        <div class="hidden md:flex items-center gap-6">
          <button
            @click="scrollToSection('account')"
            class="text-sm font-medium hover:text-primary transition"
          >
            Console
          </button>
          <a href="#" class="text-sm font-medium hover:text-primary transition">API Docs</a>
          <a href="#" class="text-sm font-medium hover:text-primary transition">Webhooks</a>
        </div>

        <div class="h-8 w-[1px] bg-gray-200 dark:bg-white/10"></div>

        <div class="flex items-center gap-3">
          <!-- API Status -->
          <span
            class="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700
                   dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold"
          >
            <span class="size-2 bg-green-500 rounded-full animate-pulse"></span>
            API ONLINE
          </span>

          <!-- Avatar -->
          <div class="size-9 rounded-full bg-slate-200 dark:bg-slate-700 border border-gray-200 dark:border-white/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-slate-600 dark:text-slate-300">
              account_circle
            </span>
          </div>

          <!-- Logout button -->
          <button
            @click="logout"
            class="text-sm font-medium text-red-500 hover:text-red-600 transition"
            title="Déconnexion"
          >
            <span class="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="max-w-[1200px] mx-auto px-6 py-8 flex flex-col gap-10">
      <!-- PAGE HEADING -->
      <div class="flex flex-col gap-2">
        <h2 class="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Full API CRUD Control Center
        </h2>
        <p class="text-[#617589] dark:text-gray-400 text-lg">
          Centralize administration of student e-commerce endpoints (v1.0.4)
        </p>
      </div>

      <!-- 1. USER ACCOUNT SECTION -->
      <section
        ref="accountSection"
        class="bg-white dark:bg-background-dark/50 border border-[#f0f2f4] dark:border-white/10
               rounded-xl overflow-hidden shadow-sm"
      >
        <div
          class="px-6 py-4 border-b border-[#f0f2f4] dark:border-white/10
                 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Mon Compte</h3>
            <span
              class="endpoint-badge text-[10px] bg-blue-50 text-blue-600 dark:bg-blue-900/20
                     dark:text-blue-400 px-2 py-0.5 rounded font-mono font-bold uppercase"
            >
              GET/PUT /users/{id}
            </span>
          </div>
          <div class="flex gap-2">
            <button
              @click="loadUserData"
              :disabled="isLoadingUser"
              class="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg
                     text-sm font-bold hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              <span class="material-symbols-outlined text-sm">refresh</span>
              {{ isLoadingUser ? 'Chargement...' : 'Charger' }}
            </button>
            <button
              @click="saveUserData"
              :disabled="isLoadingUser"
              class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg
                     text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg
                     shadow-primary/20 disabled:opacity-50"
            >
              <span class="material-symbols-outlined text-sm">save</span>
              Mettre à jour
            </button>
          </div>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Nom complet
              </label>
              <input
                v-model="userForm.name"
                type="text"
                class="w-full h-12 rounded-lg border border-[#dbe0e6] dark:border-white/10
                       dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent
                       px-4 dark:text-white outline-none transition"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                v-model="userForm.email"
                type="email"
                class="w-full h-12 rounded-lg border border-[#dbe0e6] dark:border-white/10
                       dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent
                       px-4 dark:text-white outline-none transition"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Téléphone
              </label>
              <input
                v-model="userForm.phone"
                type="tel"
                class="w-full h-12 rounded-lg border border-[#dbe0e6] dark:border-white/10
                       dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent
                       px-4 dark:text-white outline-none transition"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 2. PRODUCT SEARCH & PREVIEW -->
      <section class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Rechercher par ID</h3>
            <span
              class="endpoint-badge text-[10px] bg-green-50 text-green-600 dark:bg-green-900/20
                     dark:text-green-400 px-2 py-0.5 rounded font-mono font-bold uppercase"
            >
              GET /products/{id}
            </span>
          </div>

          <div class="flex gap-4">
            <div class="relative flex-1">
              <span
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400
                       material-symbols-outlined"
              >
                search
              </span>
              <input
                v-model.number="searchProductId"
                type="number"
                placeholder="Entrez un ID produit (ex: 5)..."
                class="w-full h-12 pl-12 rounded-lg border border-[#dbe0e6] dark:border-white/10
                       dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent
                       dark:text-white outline-none transition"
              />
            </div>
            <button
              @click="searchProduct"
              :disabled="isSearching"
              class="h-12 px-6 bg-[#111418] dark:bg-white dark:text-[#111418] text-white
                     rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition
                     disabled:opacity-50"
            >
              {{ isSearching ? 'Recherche...' : 'Fetch Data' }}
            </button>
          </div>
        </div>

        <!-- Search Result Card -->
        <div
          v-if="searchedProduct"
          class="bg-white dark:bg-background-dark/50 border border-[#f0f2f4]
                 dark:border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-6
                 shadow-sm"
        >
          <!-- Product Image -->
          <div
            class="w-full md:w-48 aspect-square rounded-lg bg-cover bg-center border
                   border-[#f0f2f4] dark:border-white/5"
            :style="{ backgroundImage: `url('${searchedProduct.image}')` }"
          ></div>

          <!-- Product Info -->
          <div class="flex-1 flex flex-col justify-between py-1">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <span
                  class="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-xs font-bold
                         rounded text-slate-900 dark:text-white"
                >
                  ID: {{ searchedProduct.id }}
                </span>
                <span
                  class="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/20
                         dark:text-blue-400 text-xs font-bold rounded"
                >
                  {{ searchedProduct.category }}
                </span>
              </div>
              <h4 class="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
                {{ searchedProduct.title }}
              </h4>
              <p class="text-[#617589] dark:text-gray-400 line-clamp-2 max-w-2xl">
                {{ searchedProduct.description }}
              </p>
            </div>

            <div class="flex items-center justify-between mt-4">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-black text-primary">{{ searchedProduct.price }}€</span>
                <span v-if="searchedProduct.rating" class="text-sm text-gray-500">
                  ⭐ {{ searchedProduct.rating.rate }}/5 ({{ searchedProduct.rating.count }})
                </span>
              </div>
              <button
                @click="editSearchedProduct"
                class="flex items-center gap-2 px-4 py-2 bg-primary text-white
                       rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                <span class="material-symbols-outlined text-sm">edit</span>
                Éditer
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. PRODUCTS CATALOG (TABLE) -->
      <section
        class="bg-white dark:bg-background-dark/50 border border-[#f0f2f4]
               dark:border-white/10 rounded-xl overflow-hidden shadow-sm"
      >
        <div
          class="px-6 py-5 border-b border-[#f0f2f4] dark:border-white/10
                 flex items-center justify-between"
        >
          <div class="flex flex-col">
            <div class="flex items-center gap-3">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">Catalogue</h3>
              <span
                class="endpoint-badge text-[10px] bg-green-50 text-green-600
                       dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded
                       font-mono font-bold uppercase"
              >
                GET /products
              </span>
            </div>
            <p class="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">
              https://fakestoreapi.com/products
            </p>
          </div>
          <button
            @click="openCreateModal"
            class="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg
                   text-sm font-bold hover:bg-primary/90 transition-all shadow-md"
          >
            <span class="material-symbols-outlined text-sm">add_circle</span>
            Nouveau Produit
          </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="bg-gray-50 dark:bg-white/5 border-b border-[#f0f2f4]
                       dark:border-white/10"
              >
                <th
                  class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider
                         dark:text-gray-400"
                >
                  ID
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider
                         dark:text-gray-400"
                >
                  Image
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider
                         dark:text-gray-400"
                >
                  Nom
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider
                         dark:text-gray-400"
                >
                  Catégorie
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider
                         dark:text-gray-400"
                >
                  Prix
                </th>
                <th
                  class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider
                         dark:text-gray-400 text-right"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#f0f2f4] dark:divide-white/10">
              <tr
                v-for="product in paginatedProducts"
                :key="product.id"
                class="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <td class="px-6 py-4 text-sm font-mono font-medium text-slate-900 dark:text-white">
                  #{{ product.id }}
                </td>
                <td class="px-6 py-4">
                  <div
                    class="size-10 rounded bg-cover bg-center border border-gray-100
                           dark:border-white/10"
                    :style="{ backgroundImage: `url('${product.image}')` }"
                  ></div>
                </td>
                <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {{ product.title }}
                </td>
                <td class="px-6 py-4">
                  <span
                    class="px-2 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold
                           rounded-full dark:bg-purple-900/20 dark:text-purple-400"
                  >
                    {{ product.category }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                  {{ product.price }}€
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="editProduct(product)"
                      class="p-2 text-primary hover:bg-primary/10 rounded transition-colors
                             material-symbols-outlined text-xl"
                      title="Modifier"
                    >
                      edit_square
                    </button>
                    <button
                      @click="deleteProduct(product.id)"
                      class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                             rounded transition-colors material-symbols-outlined text-xl"
                      title="Supprimer"
                    >
                      delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="px-6 py-4 bg-gray-50 dark:bg-white/5 border-t border-[#f0f2f4]
                 dark:border-white/10 flex items-center justify-between text-xs font-medium
                 text-gray-500"
        >
          <span>
            Affichage de {{ (currentPage - 1) * itemsPerPage + 1 }}-{{
              Math.min(currentPage * itemsPerPage, products.length)
            }}
            sur {{ products.length }} produits
          </span>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded material-symbols-outlined
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              chevron_left
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'size-6 rounded flex items-center justify-center text-xs font-bold',
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-white/10'
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded material-symbols-outlined
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              chevron_right
            </button>
          </div>
        </div>
      </section>

      <!-- 4. CREATE/EDIT PRODUCT FORM -->
      <section
        class="bg-white dark:bg-background-dark/50 border border-[#f0f2f4]
               dark:border-white/10 rounded-xl overflow-hidden shadow-sm"
      >
        <div
          class="px-6 py-5 border-b border-[#f0f2f4] dark:border-white/10
                 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">
              {{ editingProduct ? 'Éditer le Produit' : 'Ajouter un Produit' }}
            </h3>
            <span
              class="endpoint-badge text-[10px] px-2 py-0.5 rounded font-mono font-bold
                     uppercase"
              :class="
                editingProduct
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
              "
            >
              {{ editingProduct ? 'PUT /products/{id}' : 'POST /products' }}
            </span>
          </div>
          <button
            v-if="editingProduct"
            @click="resetForm"
            class="text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300
                   transition"
          >
            Annuler l'édition
          </button>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Nom du produit
              </label>
              <input
                v-model="productForm.title"
                type="text"
                placeholder="ex: Chaise Ergonomique"
                class="w-full h-12 rounded-lg border border-[#dbe0e6] dark:border-white/10
                       dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent
                       px-4 dark:text-white outline-none transition"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Prix (€)
              </label>
              <input
                v-model.number="productForm.price"
                type="number"
                placeholder="0.00"
                step="0.01"
                class="w-full h-12 rounded-lg border border-[#dbe0e6] dark:border-white/10
                       dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent
                       px-4 dark:text-white outline-none transition"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Catégorie
              </label>
              <select
                v-model="productForm.category"
                class="w-full h-12 rounded-lg border border-[#dbe0e6] dark:border-white/10
                       dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent
                       px-4 dark:text-white outline-none transition"
              >
                <option value="electronics">Électronique</option>
                <option value="jewelery">Bijoux</option>
                <option value="men's clothing">Vêtements Hommes</option>
                <option value="women's clothing">Vêtements Femmes</option>
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                URL Image
              </label>
              <input
                v-model="productForm.image"
                type="url"
                placeholder="https://..."
                class="w-full h-12 rounded-lg border border-[#dbe0e6] dark:border-white/10
                       dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent
                       px-4 dark:text-white outline-none transition"
              />
            </div>

            <div class="md:col-span-2 lg:col-span-4 flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description du produit
              </label>
              <textarea
                v-model="productForm.description"
                placeholder="Décrivez les caractéristiques techniques du produit..."
                rows="3"
                class="w-full rounded-lg border border-[#dbe0e6] dark:border-white/10
                       dark:bg-white/5 focus:ring-2 focus:ring-primary focus:border-transparent
                       p-4 dark:text-white outline-none transition resize-none"
              ></textarea>
            </div>
          </div>

          <div class="mt-8 flex justify-end gap-4 border-t border-[#f0f2f4] dark:border-white/10 pt-6">
            <button
              @click="resetForm"
              class="px-6 py-2.5 text-gray-500 font-bold hover:bg-gray-100
                     dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              @click="submitProductForm"
              :disabled="isSubmitting"
              class="flex items-center gap-2 px-8 py-2.5 bg-primary text-white rounded-lg
                     font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20
                     disabled:opacity-50"
            >
              <span class="material-symbols-outlined text-sm">
                {{ editingProduct ? 'edit' : 'rocket_launch' }}
              </span>
              {{ isSubmitting ? 'En cours...' : editingProduct ? 'Mettre à jour' : 'Créer le produit' }}
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- TOASTS -->
    <div class="fixed bottom-6 right-6 flex flex-col gap-3 pointer-events-none z-40">
      <transition-group name="toast" tag="div" class="flex flex-col gap-3">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-center gap-3 bg-white dark:bg-background-dark p-3 pr-6 rounded-lg
                 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l-4 animate-in
                 slide-in-from-right duration-300"
          :class="
            toast.type === 'success'
              ? 'border-l-green-500'
              : toast.type === 'error'
                ? 'border-l-red-500'
                : toast.type === 'warning'
                  ? 'border-l-orange-500'
                  : 'border-l-primary'
          "
        >
          <span
            class="material-symbols-outlined"
            :class="
              toast.type === 'success'
                ? 'text-green-500 bg-green-50'
                : toast.type === 'error'
                  ? 'text-red-500 bg-red-50'
                  : toast.type === 'warning'
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-primary bg-primary/5'
            "
          >
            {{
              toast.type === 'success'
                ? 'check_circle'
                : toast.type === 'error'
                  ? 'error'
                  : toast.type === 'warning'
                    ? 'warning'
                    : 'info'
            }}
          </span>
          <div class="flex flex-col">
            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ toast.title }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ toast.message }}</p>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { AdminProduct, AdminUser, CreateProductPayload, Toast } from '@/backend/type/admin';
import {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchCurrentUser,
  updateCurrentUser,
} from '@/backend/service/adminapi';
import { logout as logoutAuth, getStoredUser } from '@/backend/service/authapi';

const router = useRouter();

// ========================
// STATE
// ========================
const products = ref<AdminProduct[]>([]);
const searchedProduct = ref<AdminProduct | null>(null);
const searchProductId = ref<number | null>(null);
const editingProduct = ref<AdminProduct | null>(null);

const currentUser = ref<AdminUser | null>(null);
const toasts = ref<Toast[]>([]);

const isLoadingUser = ref(false);
const isSearching = ref(false);
const isSubmitting = ref(false);

const currentPage = ref(1);
const itemsPerPage = 5;

// Forms
const userForm = ref({
  name: '',
  email: '',
  phone: '',
});

const productForm = ref({
  title: '',
  price: 0,
  description: '',
  category: 'electronics',
  image: '',
});

// ========================
// COMPUTED
// ========================
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return products.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage);
});

// ========================
// LIFECYCLE
// ========================
onMounted(async () => {
  await loadProducts();
  await loadUserData();
});

// ========================
// FUNCTIONS - PRODUCTS
// ========================
const loadProducts = async () => {
  products.value = await fetchAllProducts();
  showToast('success', '200 OK', 'Produits chargés avec succès');
};

const searchProduct = async () => {
  if (!searchProductId.value) {
    showToast('warning', 'Erreur', 'Veuillez entrer un ID produit');
    return;
  }

  isSearching.value = true;
  searchedProduct.value = await fetchProductById(searchProductId.value);

  if (searchedProduct.value) {
    showToast('success', '200 OK', `Produit #${searchProductId.value} trouvé`);
  } else {
    showToast('error', '404 Not Found', `Produit #${searchProductId.value} introuvable`);
  }

  isSearching.value = false;
};

const editProduct = (product: AdminProduct) => {
  editingProduct.value = product;
  productForm.value = {
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
  };
};

const editSearchedProduct = () => {
  if (searchedProduct.value) {
    editProduct(searchedProduct.value);
  }
};

const deleteProduct = async (id: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

  const success = await deleteProduct(id);
  if (success) {
    products.value = products.value.filter((p) => p.id !== id);
    showToast('success', 'Suppression réussie', `Produit #${id} supprimé`);
  } else {
    showToast('error', 'Erreur', 'Impossible de supprimer le produit');
  }
};

const submitProductForm = async () => {
  if (!productForm.value.title || !productForm.value.price) {
    showToast('warning', 'Erreur', 'Veuillez remplir les champs obligatoires');
    return;
  }

  isSubmitting.value = true;

  if (editingProduct.value) {
    const result = await updateProduct(editingProduct.value.id, productForm.value);
    if (result) {
      await loadProducts();
      resetForm();
      showToast('success', 'Mise à jour réussie', 'Produit mis à jour');
    } else {
      showToast('error', 'Erreur', 'Impossible de mettre à jour le produit');
    }
  } else {
    const result = await createProduct(productForm.value as CreateProductPayload);
    if (result) {
      await loadProducts();
      resetForm();
      showToast('success', 'Création réussie', 'Produit créé avec succès');
    } else {
      showToast('error', 'Erreur', 'Impossible de créer le produit');
    }
  }

  isSubmitting.value = false;
};

const resetForm = () => {
  editingProduct.value = null;
  productForm.value = {
    title: '',
    price: 0,
    description: '',
    category: 'electronics',
    image: '',
  };
};

const openCreateModal = () => {
  resetForm();
};

// ========================
// FUNCTIONS - USER
// ========================
const loadUserData = async () => {
  isLoadingUser.value = true;
  const defaultUserId = 1; // FakeStoreAPI default
  currentUser.value = await fetchCurrentUser(defaultUserId);

  if (currentUser.value) {
    userForm.value = {
      name: currentUser.value.name || '',
      email: currentUser.value.email || '',
      phone: currentUser.value.phone || '',
    };
  }

  isLoadingUser.value = false;
};

const saveUserData = async () => {
  if (!currentUser.value) return;

  isLoadingUser.value = true;
  const result = await updateCurrentUser(currentUser.value.id, userForm.value);

  if (result) {
    currentUser.value = result;
    showToast('success', 'Mise à jour réussie', 'Données utilisateur mises à jour');
  } else {
    showToast('error', 'Erreur', 'Impossible de mettre à jour les données');
  }

  isLoadingUser.value = false;
};

// ========================
// FUNCTIONS - UTILS
// ========================
const showToast = (type: Toast['type'], title: string, message: string) => {
  const id = `${Date.now()}-${Math.random()}`;
  toasts.value.push({ id, type, title, message, duration: 4000 });

  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 4000);
};

const scrollToSection = (section: string) => {
  const element = document.querySelector(`[ref="${section}"]`) || document.getElementById(section);
  element?.scrollIntoView({ behavior: 'smooth' });
};

const logout = () => {
  logoutAuth();
  router.push('/');
};
</script>

<style scoped>
.endpoint-badge {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 300ms ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
