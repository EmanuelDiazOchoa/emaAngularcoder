import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscripcion } from '../../../core/models/inscripcion.model';


@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  // Mock temporal en memoria
  private inscripciones: Inscripcion[] = [
    { id: 1, idCurso: 1, idUsuario: 3, fecha: new Date().toISOString() },
  ];

  private inscripcionesSubject = new BehaviorSubject<Inscripcion[]>(this.inscripciones);
  inscripciones$ = this.inscripcionesSubject.asObservable();

  constructor() {}

  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.inscripciones$;
  }

  crearInscripcion(inscripcion: Inscripcion): void {
    inscripcion.id = this.generarId();
    this.inscripciones.push(inscripcion);
    this.emitirCambios();
  }

  eliminarInscripcion(id: number): void {
    this.inscripciones = this.inscripciones.filter(i => i.id !== id);
    this.emitirCambios();
  }

  private generarId(): number {
    return this.inscripciones.length > 0 
      ? Math.max(...this.inscripciones.map(i => i.id)) + 1
      : 1;
  }

  private emitirCambios(): void {
    this.inscripcionesSubject.next([...this.inscripciones]);
  }
}
