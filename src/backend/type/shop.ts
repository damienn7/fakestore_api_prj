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
}


