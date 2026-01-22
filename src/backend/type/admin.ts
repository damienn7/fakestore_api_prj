// Auteur : DamienN
// Interfaces pour l'administration

export interface AdminUser {
  id: number;
  email: string;
  username: string;
  name?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      long: string;
    };
  };
}

export interface AdminProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CreateProductPayload {
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}

export interface UpdateUserPayload {
  email?: string;
  name?: string;
  phone?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}
