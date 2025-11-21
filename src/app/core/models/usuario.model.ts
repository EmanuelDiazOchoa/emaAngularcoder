export type Rol = 'admin' | 'user';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
  password?: string;
  fechaCreacion?: string;
}
