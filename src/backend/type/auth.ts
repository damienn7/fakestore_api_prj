// Auteur : DamienN
// Interfaces pour l'authentification

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthUser {
  username: string;
  token: string;
}
