// Auteur : DamienN
// Service API – authentification
// Gestion du login via FakeStoreAPI

import type { LoginPayload, LoginResponse } from "../type/auth";
import type { Cart } from "../type/shop";

const API_URL = "https://fakestoreapi.com/auth/login";
const API_BASE = "https://fakestoreapi.com";
const TOKEN_STORAGE_KEY = "fakestore_auth_token";
const USER_STORAGE_KEY = "fakestore_auth_user";
const USER_ID_STORAGE_KEY = "fakestore_auth_user_id";
const ADMIN_USERNAMES = ["kate_h"];

type UserListItem = {
  id: number;
  username: string;
  password?: string;
  email?: string;
  name?: { firstname: string; lastname: string };
  address?: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation?: { lat: string; long: string };
  };
};

async function resolveUserByUsername(
  username: string
): Promise<{ id: number; password: string } | null> {
  try {
    const response = await fetch(`${API_BASE}/users`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const users: UserListItem[] = await response.json();
    const user = users.find((u) => u.username === username);
    if (!user || !user.password) return null;

    return { id: user.id, password: user.password };
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return null;
  }
}

/**
 * Connecte un utilisateur et récupère le token.
 * Si aucun mot de passe n'est fourni, on le récupère depuis GET /users (FakeStoreAPI fournit les passwords).
 */
export async function loginUser(payload: LoginPayload): Promise<string | null> {
  try {
    // On résout toujours le user (au moins pour obtenir son id).
    // Le mot de passe peut être fourni par l'utilisateur OU récupéré via /users.
    const resolved = await resolveUserByUsername(payload.username);

    const passwordToUse =
      payload.password && payload.password.trim().length > 0
        ? payload.password
        : resolved?.password ?? "";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: payload.username, password: passwordToUse }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data: LoginResponse = await response.json();

    if (data.token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_STORAGE_KEY, payload.username);

      const userId = resolved?.id;
      if (typeof userId === "number") {
        localStorage.setItem(USER_ID_STORAGE_KEY, String(userId));
      } else {
        localStorage.removeItem(USER_ID_STORAGE_KEY);
      }

      return data.token;
    }

    return null;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return null;
  }
}

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    return null;
  }
}

export function getStoredUser(): string | null {
  try {
    return localStorage.getItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return null;
  }
}

export function getStoredUserId(): number | null {
  try {
    const raw = localStorage.getItem(USER_ID_STORAGE_KEY);
    if (!raw) return null;
    const userId = Number(raw);
    return Number.isFinite(userId) ? userId : null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'id utilisateur :", error);
    return null;
  }
}

/**
 * Récupère les paniers du user connecté via les endpoints documentés (GET /carts puis filtrage userId)
 */
export async function fetchLoggedInUserCarts(): Promise<Cart[]> {
  const userId = getStoredUserId();
  if (userId === null) return [];

  try {
    const response = await fetch(`${API_BASE}/carts`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const carts: Cart[] = await response.json();
    return carts.filter((c) => c.userId === userId);
  } catch (error) {
    console.error("Erreur lors de la récupération des paniers :", error);
    return [];
  }
}

/**
 * Récupère un panier par id (GET /carts/{id}) et vérifie qu'il appartient au user connecté.
 */
export async function fetchLoggedInUserCartById(cartId: number): Promise<Cart | null> {
  const userId = getStoredUserId();
  if (userId === null) return null;

  try {
    const response = await fetch(`${API_BASE}/carts/${cartId}`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const cart: Cart = await response.json();
    return cart.userId === userId ? cart : null;
  } catch (error) {
    console.error("Erreur lors de la récupération du panier :", error);
    return null;
  }
}

export function logout(): void {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(USER_ID_STORAGE_KEY);
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
}

export function isAuthenticated(): boolean {
  return getStoredToken() !== null;
}

export function isAdmin(): boolean {
  const user = getStoredUser();
  return typeof user === "string" && ADMIN_USERNAMES.includes(user);
}
