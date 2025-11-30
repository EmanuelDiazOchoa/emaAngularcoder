import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../../core/models/inscripcion.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/inscripciones`;


  getAll(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.API_URL);
  }


  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.getAll();
  }


  getById(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.API_URL}/${id}`);
  }


  create(inscripcion: Omit<Inscripcion, 'id'>): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.API_URL, inscripcion);
  }


  agregar(inscripcion: Omit<Inscripcion, 'id'>): Observable<Inscripcion> {
    return this.create(inscripcion);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }


  eliminar(id: number): Observable<void> {
    return this.delete(id);
  }
}