import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Inscripcion } from '../../../core/models/inscripcion.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/inscripciones`;


  getAll(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.API_URL).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }


  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.getAll();
  }

  getById(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  create(inscripcion: Omit<Inscripcion, 'id'>): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.API_URL, inscripcion).pipe(
      catchError(this.handleError)
    );
  }


  agregar(inscripcion: Omit<Inscripcion, 'id'>): Observable<Inscripcion> {
    return this.create(inscripcion);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  eliminar(id: number): Observable<void> {
    return this.delete(id);
  }


  checkInscripcionExists(alumnoId: number, cursoId: number): Observable<boolean> {
    return this.http.get<Inscripcion[]>(
      `${this.API_URL}?alumnoId=${alumnoId}&cursoId=${cursoId}`
    ).pipe(
      map(inscripciones => inscripciones.length > 0),
      catchError(() => throwError(() => new Error('Error al verificar inscripción')))
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
          errorMessage = 'Inscripción no encontrada';
          break;
        case 400:
          errorMessage = 'Datos de inscripción inválidos';
          break;
        case 409:
          errorMessage = 'El alumno ya está inscrito en este curso';
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