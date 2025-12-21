// Auteur Rayan Chattaoui
// Ensemble des méthodes appeller pour cards FakestoreApi
// version 1.0.0
// ensemble des endpoint utilissée
const API_URL="https://fakestoreapi.com/carts";

import type { Cart } from "../type/shop";

/**
 * Récupère la liste complète des paniers
 */
export async function getallcards(): Promise<Cart[]>{
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data: Cart[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des paniers :", error);
    return [];
  }
}
export async function addcards(){

}

export async function getsingle(id: number): Promise<Cart | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const cart: Cart = await response.json();
    return cart;
  } catch (error) {
    console.error(`Erreur lors de la récupération du panier (ID: ${id}) :`, error);
    return null;
  }
}
export async function updatecards(){
    
}
export async function deletecards(){

}


