import { Injectable } from '@angular/core';
import { Usuario, Rol } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly localStorageKey = 'usuarioActual';
  private usuarioActual: Usuario | null = null;

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem(this.localStorageKey);
    this.usuarioActual = stored ? JSON.parse(stored) : null;
  }

  private updateLocalStorage(): void {
    if (this.usuarioActual) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.usuarioActual));
    } else {
      localStorage.removeItem(this.localStorageKey);
    }
  }

login(email: string, password: string, rol: Rol): boolean {
  this.usuarioActual = {
    id: email === 'admin@mail.com' ? 1 : 2,
    email,
    nombre: rol === 'admin' ? 'Administrador' : 'Usuario',
    apellido: rol === 'admin' ? 'Master' : 'Invitado',
    rol,
    fechaCreacion: new Date().toISOString()
  };

  this.updateLocalStorage();
  return true;
}




  logout(): void {
    this.usuarioActual = null;
    this.updateLocalStorage();
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  getRol(): Rol | null {
    return this.usuarioActual?.rol ?? null;
  }

  isAdmin(): boolean {
    return this.usuarioActual?.rol === 'admin';
  }

  isLogged(): boolean {
    return !!this.usuarioActual;
  }
}
