// Auteur Rayan Chattaoui
// Ensemble des méthodes appeller pour cards FakestoreApi
// version 1.0.0
// ensemble des endpoint utilissée
const API_URL="https://fakestoreapi.com/carts";

import type { Cart } from "../type/shop";

/**
 * Récupère la liste complète des paniers
 */
export async function getallcards(){
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}
export async function addcards(){

}

export async function getsingle(){

}
export async function updatecards(){
    
}
export async function deletecards(){

}


