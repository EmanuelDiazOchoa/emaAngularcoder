import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../../../core/models/inscripcion.model';
import { CursoService } from '../../../cursos/service/curso.service';
import { UsuariosService } from '../../../../core/services/usuario.service';
import { AlumnosService } from '../../../../core/services/alumnos.service';

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="container mt-4">
    <h2>📋 Lista de Inscripciones</h2>
    
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Curso</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let i of inscripciones$ | async">
          <td>{{ obtenerNombreUsuario(i.idUsuario) }}</td>
          <td>{{ obtenerNombreCurso(i.idCurso) }}</td>
          <td>{{ i.fecha | date:'short' }}</td>
          <td>
            <button class="btn btn-danger btn-sm" (click)="eliminar(i.id)">
              🗑 Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class ListaInscripcionesComponent {

  inscripciones$: Observable<Inscripcion[]>;

  constructor(
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService: CursoService,
    private usuariosService: UsuariosService,
  ) {
    this.inscripciones$ = this.inscripcionesService.obtenerInscripciones();
  }

  eliminar(id: number) {
    this.inscripcionesService.eliminarInscripcion(id);
  }

  obtenerNombreUsuario(id: number): string {
    return this.usuariosService.obtenerPorId(id)?.nombre ?? 'Desconocido';
  }

  obtenerNombreCurso(id: number): string {
    return this.cursosService.obtenerCursoPorId(id)?.nombre ?? 'Desconocido';
  }
}
