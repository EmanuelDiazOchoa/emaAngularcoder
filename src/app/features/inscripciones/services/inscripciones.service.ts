import { Injectable } from '@angular/core'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscripcion } from '../../../core/models/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private inscripciones: Inscripcion[] = [];

  private inscripciones$ = new BehaviorSubject<Inscripcion[]>(this.inscripciones);

  // Obtener todas
  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.inscripciones$.asObservable();
  }

  // Agregar inscripción
  agregar(inscripcion: Omit<Inscripcion, 'id'>) {
    const nueva: Inscripcion = {
      id: this.inscripciones.length + 1,
      ...inscripcion
    };

    this.inscripciones.push(nueva);
    this.inscripciones$.next(this.inscripciones);
  }

  // Eliminar inscripción
  eliminar(id: number) {
    this.inscripciones = this.inscripciones.filter(i => i.id !== id);
    this.inscripciones$.next(this.inscripciones);
  }
}
