<!-- Nyancat (je voulais mettre ceci au début du fichier : Rayan) -->
<!-- Auteur Thomas et Rayan -->
<script setup lang="ts">
import { ref } from "vue";


const viewMode = ref<"grid" | "list">("grid");
</script>

<template>
  <!-- Main Content Area -->
  <section class="flex-1 flex flex-col bg-[#FAFAFA] overflow-hidden">
    <!-- Header -->
    <div
      class="px-6 py-5 flex items-center justify-between
             bg-[#FAFAFA]/90 backdrop-blur-sm
             sticky top-0 z-10 border-b border-slate-200"
    >
      <h2 class="text-[#0d141c] text-xl font-bold tracking-tight">
        Grid View
      </h2>

      <!-- Toggle buttons -->
      <div class="hidden md:flex h-8 items-center rounded-lg bg-slate-200 p-1 gap-1">
        <button
          @click="viewMode = 'grid'"
          :class="[
            'flex items-center justify-center px-3 h-full rounded text-xs font-medium transition',
            viewMode === 'grid'
              ? 'bg-white shadow-sm text-primary'
              : 'text-slate-500 hover:bg-white/50'
          ]"
        >
          <span class="material-symbols-outlined text-[16px] mr-1">
            grid_view
          </span>
          Grid
        </button>

        <button
          @click="viewMode = 'list'"
          :class="[
            'flex items-center justify-center px-3 h-full rounded text-xs font-medium transition',
            viewMode === 'list'
              ? 'bg-white shadow-sm text-primary'
              : 'text-slate-500 hover:bg-white/50'
          ]"
        >
          <span class="material-symbols-outlined text-[16px] mr-1">
            view_list
          </span>
          List
        </button>
      </div>
    </div>

    <!-- GRID VIEW (par défaut) -->
    <div v-if="viewMode === 'grid'" class="flex-1 overflow-y-auto p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        <!-- Card -->
        <div
          class="group flex flex-col bg-white rounded-xl
                 shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                 transition-all duration-300
                 border border-slate-100 overflow-hidden"
        >
          <!-- Image -->
          <div class="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
            <div
              class="w-full h-full bg-center bg-cover
                     transition-transform duration-500 group-hover:scale-105"
              style="background-image:url('https://lh3.googleusercontent.com/aida-public/AB6AXuD42Dcpeg9bB9UJHeEtNe_9v4IQcI6z5bXkSbbKQ4iWACwwqhauf0qVg_qC95iiHrLuVkFzM8Iqp2auR15W35htSRY0UrvzCKLT_i0TcU6VV_jg4y_8V_dBR0BXv7jwSeB_AUH5uyyCqOMvkfrPxnmS7RwNfZ94_j3b5SWIju7B21ahuD0bII7_4QpvjzXItITsGaEtaMnQwPSdUb_Nk-nHxryG18rmRj8DYNkp5cyuv-e6BWjIjy8I7DWL8u7m_GCSW5CdzBrlNtoX')"
            ></div>

            <div
              class="absolute top-3 right-3 bg-white/90 backdrop-blur
                     rounded-full px-2 py-1 text-xs font-bold
                     text-slate-800 shadow-sm"
            >
              $299
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-col flex-1 p-4 gap-3">
            <div>
              <h3
                class="text-[#0d141c] text-lg font-bold leading-tight mb-1
                       group-hover:text-primary transition-colors"
              >
                Wireless Headphones
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed line-clamp-2">
                Noise cancelling over-ear headphones with 40h battery life.
              </p>
            </div>

            <div class="mt-auto pt-2">
              <button
                class="w-full flex items-center justify-center
                       rounded-lg h-10 px-4 bg-primary
                       hover:bg-blue-600 text-white text-sm font-medium
                       transition-colors shadow-sm shadow-blue-200"
              >
                Acheter 🛒
              </button>
            </div>
          </div>
        </div>
        <!-- /Card -->
      </div>
    </div>

    <!-- LIST VIEW (placeholder, pas affichée visuellement) -->
    <div v-else class="flex-1 flex items-center justify-center text-slate-400">
      List view à venir…
    </div>
  </section>
</template>