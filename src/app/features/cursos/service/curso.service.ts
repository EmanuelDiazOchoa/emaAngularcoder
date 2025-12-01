import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Curso } from '../../../core/models/curso.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/cursos`;

  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API_URL).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.getAll();
  }

  getById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  obtenerCursoPorId(id: number): Observable<Curso> {
    return this.getById(id);
  }

  create(curso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.http.post<Curso>(this.API_URL, curso).pipe(
      catchError(this.handleError)
    );
  }

  add(curso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.create(curso);
  }

  update(id: number, changes: Partial<Curso>): Observable<Curso> {
    return this.http.patch<Curso>(`${this.API_URL}/${id}`, changes).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
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
          errorMessage = 'Curso no encontrado';
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