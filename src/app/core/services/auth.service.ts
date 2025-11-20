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

login(email: string, password: string): boolean {

  if (email === 'admin@mail.com') {
    this.usuarioActual = {
      id: 1,
      email,
      nombre: 'Administrador',
      apellido: 'Master',
      rol: 'admin',
      fechaCreacion: new Date().toISOString()  // 👈 AGREGADO
    };
  } else {
    this.usuarioActual = {
      id: 2,
      email,
      nombre: 'Usuario',
      apellido: 'Invitado',
      rol: 'user',
      fechaCreacion: new Date().toISOString()  // 👈 AGREGADO
    };
  }

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
