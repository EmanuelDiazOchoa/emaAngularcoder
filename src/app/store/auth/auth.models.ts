export type Rol = 'admin' | 'user';

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido?: string;
  rol: Rol;
  fechaCreacion?: string;
}

export interface AuthState {
  user: Usuario | null;
  loading: boolean;
  error?: string | null;
}
