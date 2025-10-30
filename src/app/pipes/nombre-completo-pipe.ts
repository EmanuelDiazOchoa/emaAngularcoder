import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../alumnos/alumnos.model';

@Pipe({
  name: 'nombreCompleto',
  standalone: true
})
export class NombreCompletoPipe implements PipeTransform {
  transform(alumno: Alumno): string {
    if (!alumno || !alumno.nombre || !alumno.apellido) {
      return '';
    }
    return `${alumno.nombre} ${alumno.apellido}`;
  }
}
