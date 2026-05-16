// Tipo para el vehículo — coincide exactamente con el modelo del backend
export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  locality: string;
  applicant: string;
  price: string;
  created_at: string;
  updated_at: string;
}

// Tipo para el usuario autenticado
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'viewer';
}

// Tipo para la respuesta del login
export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}