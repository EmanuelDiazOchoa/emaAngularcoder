import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../models/alumnos.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private alumnos: Alumno[] = [];
  private alumnos$ = new BehaviorSubject<Alumno[]>([]);
  private readonly localStorageKey = 'alumnos';

  constructor() {
    this.loadAlumnosFromLocalStorage();
  }

  private loadAlumnosFromLocalStorage(): void {
  const storedAlumnos = localStorage.getItem(this.localStorageKey);

  if (storedAlumnos) {
    this.alumnos = JSON.parse(storedAlumnos);
  } else {
    this.alumnos = [
      { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan.perez@example.com', fechaInscripcion: '2024-01-10' },
      { id: 2, nombre: 'Maria', apellido: 'Gomez', email: 'maria.gomez@example.com', fechaInscripcion: '2024-02-20' }
    ];
  }
  this.alumnos$.next(this.alumnos);
}


  private updateLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.alumnos));
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }

  addAlumno(alumno: Omit<Alumno, 'id'>): void {
    const newId = this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
    const newAlumno: Alumno = { ...alumno, id: newId };
    this.alumnos = [...this.alumnos, newAlumno];
    this.alumnos$.next(this.alumnos);
    this.updateLocalStorage();
  }

  deleteAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(a => a.id !== id);
    this.alumnos$.next(this.alumnos);
    this.updateLocalStorage();
  }
}
