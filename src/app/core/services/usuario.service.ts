import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/users`;


  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.getAll();
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(usuario: Omit<Usuario, 'id' | 'fechaCreacion'>): Observable<Usuario> {
    const newUser = {
      ...usuario,
      fechaCreacion: new Date().toISOString()
    };
    return this.http.post<Usuario>(this.API_URL, newUser).pipe(
      catchError(this.handleError)
    );
  }

  add(usuario: Omit<Usuario, 'id' | 'fechaCreacion'>): Observable<Usuario> {
    return this.create(usuario);
  }

  update(id: number, changes: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.API_URL}/${id}`, changes).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  checkEmailExists(email: string, excludeId?: number): Observable<boolean> {
    return this.http.get<Usuario[]>(`${this.API_URL}?email=${email}`).pipe(
      map(usuarios => {
        if (excludeId) {
          return usuarios.some(u => u.id !== excludeId);
        }
        return usuarios.length > 0;
      }),
      catchError(() => throwError(() => new Error('Error al verificar email')))
    );
  }


  getByIdSync(id: number): Usuario | undefined {
    return undefined;
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error de red: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.';
          break;
        case 404:
          errorMessage = 'Usuario no encontrado';
          break;
        case 400:
          errorMessage = 'Datos de usuario inválidos';
          break;
        case 409:
          errorMessage = 'El email ya está registrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}