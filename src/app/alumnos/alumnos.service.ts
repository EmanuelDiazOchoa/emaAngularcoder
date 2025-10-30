import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alumno } from './alumnos.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos: Alumno[] = [];
  private alumnos$ = new BehaviorSubject<Alumno[]>([]);
  private localStorageKey = 'alumnos';

  constructor() {
    this.loadAlumnosFromLocalStorage();
  }

  private loadAlumnosFromLocalStorage() {
    const storedAlumnos = localStorage.getItem(this.localStorageKey);
    if (storedAlumnos) {
      this.alumnos = JSON.parse(storedAlumnos);
    } else {
      
      this.alumnos = [
        { id: 1, nombre: 'Juan', apellido: 'Perez', email: 'juan.perez@example.com' },
        { id: 2, nombre: 'Maria', apellido: 'Gomez', email: 'maria.gomez@example.com' }
      ];
    }
    this.alumnos$.next(this.alumnos);
  }

  private updateLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.alumnos));
  }

  getAlumnos() {
    return this.alumnos$.asObservable();
  }

  addAlumno(alumno: Omit<Alumno, 'id'>) {
    const newId = this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
    const newAlumno = { ...alumno, id: newId };
    this.alumnos = [...this.alumnos, newAlumno];
    this.alumnos$.next(this.alumnos);
    this.updateLocalStorage();
  }

  deleteAlumno(id: number) {
    this.alumnos = this.alumnos.filter(a => a.id !== id);
    this.alumnos$.next(this.alumnos);
    this.updateLocalStorage();
  }
}