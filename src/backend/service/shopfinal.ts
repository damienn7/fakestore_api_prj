// Auteur Rayan Chattaoui
// Ensemble des méthodes appeller pour cards FakestoreApi
// version 1.0.0
// ensemble des endpoint utilissée
const API_URL="https://fakestoreapi.com/carts";

import type { Cart, CartRequest } from "../type/shop";

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
export async function addcards(cartData: CartRequest): Promise<Cart | null> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const cart: Cart = await response.json();
    return cart;
  } catch (error) {
    console.error("Erreur lors de la création du panier :", error);
    return null;
  }
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
export async function updatecards(id: number, cartData: CartRequest): Promise<Cart | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const cart: Cart = await response.json();
    return cart;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du panier (ID: ${id}) :`, error);
    return null;
  }
}
export async function deletecards(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression du panier (ID: ${id}) :`, error);
    return false;
  }
}

/**
 * Récupère les paniers d'un utilisateur
 */
export async function getUserCarts(userId: number): Promise<Cart[]> {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const carts: Cart[] = await response.json();
    return carts;
  } catch (error) {
    console.error(`Erreur lors de la récupération des paniers de l'utilisateur (ID: ${userId}) :`, error);
    return [];
  }
}
