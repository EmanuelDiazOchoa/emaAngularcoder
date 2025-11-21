import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Curso } from '../../../core/models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private cursos: Curso[] = [
    {
      id: 1,
      nombre: 'Angular Básico',
      descripcion: 'Introducción a Angular',
      duracion: '4 semanas',
      fechaInicio: '2024-01-15',
      fechaFin: '2024-02-15'
    },
    {
      id: 2,
      nombre: 'React Inicial',
      descripcion: 'Fundamentos de React',
      duracion: '3 semanas',
      fechaInicio: '2024-03-01',
      fechaFin: '2024-03-22'
    }
  ];

  private cursos$ = new BehaviorSubject<Curso[]>(this.cursos);

  // Método para obtener cursos
  obtenerCursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  getById(id: number): Observable<Curso | undefined> {
    return of(this.cursos.find(c => c.id === id));
  }

  add(curso: Omit<Curso, 'id'>) {
    const nuevo: Curso = {
      id: this.cursos.length + 1,
      ...curso
    };

    this.cursos.push(nuevo);
    this.cursos$.next(this.cursos);
  }

  update(id: number, curso: Partial<Curso>) {
    this.cursos = this.cursos.map(c =>
      c.id === id ? { ...c, ...curso } : c
    );
    this.cursos$.next(this.cursos);
  }

  delete(id: number) {
    this.cursos = this.cursos.filter(c => c.id !== id);
    this.cursos$.next(this.cursos);
  }

  obtenerCursoPorId(id: number): Curso | undefined {
    return this.cursos.find(c => c.id === id);
  }

}
