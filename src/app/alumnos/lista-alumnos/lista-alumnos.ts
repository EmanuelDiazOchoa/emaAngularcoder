import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NombreCompletoPipe } from '../../pipes/nombre-completo-pipe';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.html',
  styleUrls: ['./lista-alumnos.scss'],
  imports: [
    MatTableModule,
    NombreCompletoPipe
  ],
  standalone: true
})
export class ListaAlumnosComponent {
  columnas = ['nombre', 'curso'];
  alumnos = [
    { nombre: 'Emanuel', apellido: 'Díaz', curso: 'Angular 20' },
    { nombre: 'Lucía', apellido: 'Pérez', curso: 'React' },
    { nombre: 'Juan', apellido: 'Gómez', curso: 'Node.js' },
  ];
}
