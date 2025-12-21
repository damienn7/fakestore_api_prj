//Auteur Rayan Chattaoui
//Interface Cart (version française)
/* =========================
   PANIER
========================= */

import type { ProductFR } from "./products";

/**
 * Produit présent dans le panier
 */
export interface CartItem {
  productId: number;
  quantity: number;
  product?: ProductFR; // optionnel : utile pour afficher les infos
}

