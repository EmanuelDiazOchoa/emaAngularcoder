import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../../core/models/alumnos.model';

@Pipe({
  name: 'nombreCompleto',
  standalone: true 
})
export class NombreCompletoPipe implements PipeTransform {
  transform(value: Alumno): string {
    return `${value.nombre} ${value.apellido}`;
  }
}
