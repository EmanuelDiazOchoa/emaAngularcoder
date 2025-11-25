import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../../../core/models/alumnos.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan.perez@example.com', fechaInscripcion: '2024-01-10' },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', email: 'maria.gomez@example.com', fechaInscripcion: '2024-02-20' }
  ];
  private alumnos$ = new BehaviorSubject<Alumno[]>(this.alumnos);

  constructor() {}

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }

  addAlumno(alumno: Omit<Alumno, 'id'>): void {
    const newId = this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
    const newAlumno: Alumno = { ...alumno, id: newId };
    this.alumnos = [...this.alumnos, newAlumno];
    this.alumnos$.next(this.alumnos);
  }

  deleteAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(a => a.id !== id);
    this.alumnos$.next(this.alumnos);
  }
}
