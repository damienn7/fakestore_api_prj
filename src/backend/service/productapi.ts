// Auteur : Thomas et Rayan
// Service API – gestion des produits
// Récupération des données depuis FakeStoreAPI
// Les données sont ensuite consommées par les vues (grid, list, details)

import type { Product } from "../type/products";

const API_URL = "https://fakestoreapi.com/products";

/**
 * Récupère la liste complète des produits
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const products: Product[] = await response.json();
    return products;

  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
}

/**
 * Récupère le détail d’un produit par son ID
 * Utilisé pour la page details.vue
 */
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const product: Product = await response.json();
    return product;

  } catch (error) {
    console.error(
      `Erreur lors de la récupération du produit (ID: ${id}) :`,
      error
    );
    return null;
  }
}

// nyancat (Auteur de ce commentaire : Rayan, raison : drôle)
