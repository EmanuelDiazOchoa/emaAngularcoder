import { Injectable } from '@angular/core'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inscripcion } from '../../../core/models/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private inscripciones: Inscripcion[] = [];

  private inscripciones$ = new BehaviorSubject<Inscripcion[]>(this.inscripciones);

  constructor(private http: HttpClient) {}

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
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`/api/inscripciones/${id}`);
  }
}
