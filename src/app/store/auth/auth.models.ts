export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password?: string; 
  rol: 'admin' | 'user';
}

export interface AuthState {
  user: Usuario | null;
}
