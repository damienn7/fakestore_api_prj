// Auteur : DamienN
// Service API – authentification
// Gestion du login via FakeStoreAPI

import type { LoginPayload, LoginResponse } from "../type/auth";

const API_URL = "https://fakestoreapi.com/auth/login";
const TOKEN_STORAGE_KEY = "fakestore_auth_token";
const USER_STORAGE_KEY = "fakestore_auth_user";

/**
 * Connecte un utilisateur et récupère le token
 */
export async function loginUser(payload: LoginPayload): Promise<string | null> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data: LoginResponse = await response.json();

    // Stockage du token
    if (data.token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_STORAGE_KEY, payload.username);
      return data.token;
    }

    return null;

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return null;
  }
}

/**
 * Récupère le token stocké
 */
export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    return null;
  }
}

/**
 * Récupère l'utilisateur stocké
 */
export function getStoredUser(): string | null {
  try {
    return localStorage.getItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return null;
  }
}

/**
 * Déconnexion de l'utilisateur
 */
export function logout(): void {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
}

/**
 * Vérifie si l'utilisateur est connecté
 */
export function isAuthenticated(): boolean {
  return getStoredToken() !== null;
}
