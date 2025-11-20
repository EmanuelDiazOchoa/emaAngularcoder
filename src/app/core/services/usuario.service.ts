import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

  private usuarios: Usuario[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@test.com', rol: 'admin', fechaCreacion: '2024-01-01' },
    { id: 2, nombre: 'Ana', apellido: 'Gomez', email: 'ana@test.com', rol: 'user', fechaCreacion: '2024-01-02' }
  ];

  private usuarios$ = new BehaviorSubject<Usuario[]>(this.usuarios);

  // 📌 Listado de usuarios (observable)
  getAll(): Observable<Usuario[]> {
    return this.usuarios$.asObservable();
  }

  // 📌 Buscar usuario con observable
  getById(id: number): Observable<Usuario | undefined> {
    return of(this.usuarios.find(u => u.id === id));
  }

  // 📌 Buscar usuario de forma síncrona (para pipes o tablas)
  obtenerPorId(id: number): Usuario | undefined {
    return this.usuarios.find(u => u.id === id);
  }

  // 📌 Crear usuario
  add(usuario: Omit<Usuario, 'id' | 'fechaCreacion'>): Observable<void> {
    const newUser: Usuario = {
      ...usuario,
      id: Date.now(),
      fechaCreacion: new Date().toISOString()
    };

    this.usuarios.push(newUser);
    this.usuarios$.next(this.usuarios);
    return of();
  }

  // 📌 Actualizar usuario
  update(id: number, usuario: Partial<Usuario>): Observable<void> {
    this.usuarios = this.usuarios.map(u =>
      u.id === id ? { ...u, ...usuario } : u
    );

    this.usuarios$.next(this.usuarios);
    return of();
  }

  // 📌 Eliminar usuario
  delete(id: number): Observable<void> {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    this.usuarios$.next(this.usuarios);
    return of();
  }
}
