import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../../../core/models/inscripcion.model';
import { CursoService } from '../../../cursos/service/curso.service';
import { UsuariosService } from '../../../usuarios/services/usuario.service';

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
          <td>{{ obtenerNombreUsuario(i.usuarioId) }}</td>
          <td>{{ obtenerNombreCurso(i.cursoId) }}</td>
          <td>{{ i.fecha | date:'short' }}</td>
          <td>
            <button class="btn btn-danger btn-sm" (click)="eliminar(i.id)">Eliminar</button>
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
    private cursosService: CursoService,
    private usuariosService: UsuariosService,
  ) {
    this.inscripciones$ = this.inscripcionesService.obtenerInscripciones();
  }

  eliminar(id: string) {
    this.inscripcionesService.eliminarInscripcion(id);
  }

  obtenerNombreUsuario(id?: string): string {
    if (!id) return 'Desconocido';
    const u = this.usuariosService.getByIdSync(id);
    return u ? `${u.nombre} ${u.apellido ?? ''}`.trim() : 'Desconocido';
  }

  obtenerNombreCurso(id?: string): string {
    if (!id) return 'Desconocido';
    const c = this.cursosService.obtenerCursoPorId(id);
    return c?.nombre ?? 'Desconocido';
  }
}
