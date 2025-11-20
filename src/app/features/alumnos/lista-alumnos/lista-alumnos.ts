import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';
import { AlumnosService } from '../../../core/services/alumnos.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.html',
  styleUrls: ['./lista-alumnos.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    NombreCompletoPipe,
    MatButtonModule,
    MatIconModule
  ],
  standalone: true
})
export class ListaAlumnosComponent {
  alumnosService = inject(AlumnosService);
  columnas = ['nombre', 'email', 'acciones'];
  alumnos$ = this.alumnosService.getAlumnos();

  eliminarAlumno(id: number): void {
    this.alumnosService.deleteAlumno(id);
  }
}