import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.html',
  styleUrls: ['./lista-alumnos.scss']
})
export class ListaAlumnosComponent {
  columnas = ['nombre', 'curso'];
  alumnos = [
    { nombre: 'Emanuel', apellido: 'Díaz', curso: 'Angular 20' },
    { nombre: 'Lucía', apellido: 'Pérez', curso: 'React' },
    { nombre: 'Juan', apellido: 'Gómez', curso: 'Node.js' },
  ];
}
