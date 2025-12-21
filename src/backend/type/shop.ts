//Auteur Rayan Chattaoui
//Interface Cart (version française)
/* =========================
   PANIER
========================= */

import type { ProductFR, Product } from "./products";

/**
 * Produit présent dans le panier (format FakeStoreAPI)
 */
export interface CartItem {
  productId: number;
  quantity: number;
}

/**
 * Panier utilisateur (format FakeStoreAPI)
 */
export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}/**
 * CartItem enrichi avec les détails du produit pour l'affichage
 */
export interface CartItemWithDetails extends CartItem {
  title: string;
  price: number;
  image: string;
  category: string;
}



