import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../../../core/models/curso.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/cursos`;


  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API_URL);
  }

 
  obtenerCursos(): Observable<Curso[]> {
    return this.getAll();
  }


  getById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.API_URL}/${id}`);
  }


  create(curso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.http.post<Curso>(this.API_URL, curso);
  }

  add(curso: Omit<Curso, 'id'>): Observable<Curso> {
    return this.create(curso);
  }

 
  update(id: number, changes: Partial<Curso>): Observable<Curso> {
    return this.http.patch<Curso>(`${this.API_URL}/${id}`, changes);
  }

  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  
  obtenerCursoPorId(id: number): Observable<Curso> {
    return this.getById(id);
  }
}