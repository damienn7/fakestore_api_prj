<script setup lang="ts">
type Product = {
  id: number
  title: string
  description: string
  price: number
  image: string
}

const products: Product[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "Noise cancelling over-ear headphones with 40h battery life.",
    price: 299,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD42Dcpeg9bB9UJHeEtNe_9v4IQcI6z5bXkSbbKQ4iWACwwqhauf0qVg_qC95iiHrLuVkFzM8Iqp2auR15W35htSRY0UrvzCKLT_i0TcU6VV_jg4y_8V_dBR0BXv7jwSeB_AUH5uyyCqOMvkfrPxnmS7RwNfZ94_j3b5SWIju7B21ahuD0bII7_4QpvjzXItITsGaEtaMnQwPSdUb_Nk-nHxryG18rmRj8DYNkp5cyuv-e6BWjIjy8I7DWL8u7m_GCSW5CdzBrlNtoX",
  },
]
</script>

<template>
  <section class="flex-1 flex flex-col bg-[#FAFAFA] overflow-hidden">
    <!-- Header -->
    <div
      class="px-6 py-5 sticky top-0 z-10 bg-[#FAFAFA]/90 backdrop-blur-sm"
    >
      <h2 class="text-[#0d141c] text-xl font-bold tracking-tight">
        Grid View
      </h2>
    </div>

    <!-- Grid -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
        <div
          v-for="product in products"
          :key="product.id"
          class="group flex flex-col bg-white rounded-xl
                 border border-slate-100
                 shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                 hover:-translate-y-1
                 transition-all duration-300 overflow-hidden"
        >
          <div class="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
            <div
              class="w-full h-full bg-cover bg-center
                     transition-transform duration-500
                     group-hover:scale-110"
              :style="{ backgroundImage: `url(${product.image})` }"
            ></div>

            <div
              class="absolute top-3 right-3 bg-white/90 backdrop-blur
                     rounded-full px-2 py-1 text-xs font-bold
                     text-slate-800 shadow-sm"
            >
              ${{ product.price }}
            </div>
          </div>

          <div class="flex flex-col flex-1 p-4 gap-3">
            <h3
              class="text-lg font-bold text-[#0d141c]
                     group-hover:text-primary transition-colors"
            >
              {{ product.title }}
            </h3>

            <p class="text-slate-500 text-sm leading-relaxed line-clamp-2">
              {{ product.description }}
            </p>

            <button
              class="mt-auto w-full h-10 rounded-lg bg-primary
                     hover:bg-blue-600 text-white text-sm font-medium
                     transition-colors shadow-sm shadow-blue-200"
            >
              Acheter 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>