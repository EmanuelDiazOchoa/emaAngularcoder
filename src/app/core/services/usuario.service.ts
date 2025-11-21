import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // --------------------------
  // 🌟 Datos iniciales fake
  // --------------------------
  private usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@test.com',
      rol: 'admin',
      fechaCreacion: new Date().toISOString()
    },
    {
      id: 2,
      nombre: 'Ana',
      apellido: 'Gomez',
      email: 'ana@test.com',
      rol: 'user',
      fechaCreacion: new Date().toISOString()
    }
  ];

  // --------------------------
  // 📌 BehaviorSubject para reactividad
  // --------------------------
  private usuarios$ = new BehaviorSubject<Usuario[]>([...this.usuarios]);

  // --------------------------
  // 📌 Métodos públicos
  // --------------------------

  // Observable para componentes
  getUsuarios(): Observable<Usuario[]> {
    return this.usuarios$.asObservable();
  }

  // Compatibilidad con código viejo
  getAll(): Observable<Usuario[]> {
    return this.getUsuarios();
  }

  // Búsqueda async
  getById(id: number): Observable<Usuario | undefined> {
    return of(this.usuarios.find(u => u.id === id));
  }

  // Helper síncrono (corregido)
  getByIdSync(id: number): Usuario | undefined {
    return this.usuarios.find(u => u.id === id);
  }

  // Crear usuario
  add(usuario: Omit<Usuario, 'id' | 'fechaCreacion'>): Observable<Usuario> {
    const newUser: Usuario = {
      ...usuario,
      id: Date.now(), // ID único fake
      fechaCreacion: new Date().toISOString()
    };

    this.usuarios.push(newUser);
    this.usuarios$.next([...this.usuarios]);
    return of(newUser);
  }

  // Actualizar usuario
  update(id: number, usuario: Partial<Usuario>): Observable<Usuario | undefined> {
    this.usuarios = this.usuarios.map(u =>
      u.id === id ? { ...u, ...usuario } : u
    );
    const updated = this.usuarios.find(u => u.id === id);
    this.usuarios$.next([...this.usuarios]);
    return of(updated);
  }

  // Eliminar usuario
  delete(id: number): Observable<void> {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    this.usuarios$.next([...this.usuarios]);
    return of();
  }
}
