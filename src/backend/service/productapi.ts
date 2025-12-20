// Auteur Thomas et Rayan
// Gestion simple de l'endpoint product via appelle et ensuite donnée json communiquer 
import type { Product } from "../type/products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products: Product[] = await response.json();
    return products;

  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
}
