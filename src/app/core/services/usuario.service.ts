import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/users`;


  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }


  getUsuarios(): Observable<Usuario[]> {
    return this.getAll();
  }


  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/${id}`);
  }

  create(usuario: Omit<Usuario, 'id' | 'fechaCreacion'>): Observable<Usuario> {
    const newUser = {
      ...usuario,
      fechaCreacion: new Date().toISOString()
    };
    return this.http.post<Usuario>(this.API_URL, newUser);
  }


  add(usuario: Omit<Usuario, 'id' | 'fechaCreacion'>): Observable<Usuario> {
    return this.create(usuario);
  }


  update(id: number, changes: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.API_URL}/${id}`, changes);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }


  getByIdSync(id: number): Usuario | undefined {
    
    return undefined;
  }
}