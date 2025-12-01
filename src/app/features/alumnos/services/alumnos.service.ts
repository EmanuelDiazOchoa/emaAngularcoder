import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Alumno } from '../../../core/models/alumnos.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/alumnos`;


  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.API_URL).pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(alumno: Omit<Alumno, 'id'>): Observable<Alumno> {
    return this.http.post<Alumno>(this.API_URL, alumno).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, changes: Partial<Alumno>): Observable<Alumno> {
    return this.http.patch<Alumno>(`${this.API_URL}/${id}`, changes).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  checkEmailExists(email: string, excludeId?: number): Observable<boolean> {
    return this.http.get<Alumno[]>(`${this.API_URL}?email=${email}`).pipe(
      map(alumnos => {
        if (excludeId) {
          return alumnos.some(a => a.id !== excludeId);
        }
        return alumnos.length > 0;
      }),
      catchError(() => throwError(() => new Error('Error al verificar email')))
    );
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
          errorMessage = 'Alumno no encontrado';
          break;
        case 400:
          errorMessage = 'Datos inválidos';
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