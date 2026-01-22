// Auteur : Thomas et Rayan
// Service API – inscription utilisateur
// Centralise la logique d’appel HTTP pour le register

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

/**
    * Inscrit un nouvel utilisateur via l’API FakeStore.
 */
export async function registerUser(payload: RegisterPayload): Promise<boolean> {
  try {
    const response = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    await response.json();
    return true;

  } catch (error) {
    console.error("Erreur lors de l’inscription :", error);
    return false;
  }
}
