import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../../../core/models/alumnos.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/alumnos`;

  
  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.API_URL);
  }

  
  getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.API_URL}/${id}`);
  }

  
  create(alumno: Omit<Alumno, 'id'>): Observable<Alumno> {
    return this.http.post<Alumno>(this.API_URL, alumno);
  }

  
  update(id: number, changes: Partial<Alumno>): Observable<Alumno> {
    return this.http.patch<Alumno>(`${this.API_URL}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}