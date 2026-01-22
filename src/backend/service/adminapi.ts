// Auteur : DamienN
// Service API – administration des produits et utilisateurs
// Centralise la logique CRUD pour le panel admin

import type {
  AdminProduct,
  AdminUser,
  CreateProductPayload,
  UpdateProductPayload,
  UpdateUserPayload,
} from "../type/admin";

const API_BASE = "https://fakestoreapi.com";
const TOKEN_HEADER = () => {
  const token = localStorage.getItem("fakestore_auth_token");
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {
        "Content-Type": "application/json",
      };
};

// ================================
// PRODUITS
// ================================

/**
 * Récupère tous les produits
 */
export async function fetchAllProducts(): Promise<AdminProduct[]> {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      headers: TOKEN_HEADER(),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
}

/**
 * Récupère un produit par ID
 */
export async function fetchProductById(id: number): Promise<AdminProduct | null> {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      headers: TOKEN_HEADER(),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit ${id} :`, error);
    return null;
  }
}

/**
 * Crée un nouveau produit
 */
export async function createProduct(
  payload: CreateProductPayload
): Promise<AdminProduct | null> {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: TOKEN_HEADER(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    return null;
  }
}

/**
 * Met à jour un produit
 */
export async function updateProduct(
  id: number,
  payload: UpdateProductPayload
): Promise<AdminProduct | null> {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: TOKEN_HEADER(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du produit ${id} :`, error);
    return null;
  }
}

/**
 * Supprime un produit
 */
export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
      headers: TOKEN_HEADER(),
    });

    return response.ok;
  } catch (error) {
    console.error(`Erreur lors de la suppression du produit ${id} :`, error);
    return false;
  }
}

// ================================
// UTILISATEURS
// ================================

/**
 * Récupère les informations de l'utilisateur connecté
 */
export async function fetchCurrentUser(userId: number): Promise<AdminUser | null> {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      headers: TOKEN_HEADER(),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return null;
  }
}

/**
 * Met à jour les informations de l'utilisateur
 */
export async function updateCurrentUser(
  userId: number,
  payload: UpdateUserPayload
): Promise<AdminUser | null> {
  try {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: "PUT",
      headers: TOKEN_HEADER(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    return null;
  }
}
