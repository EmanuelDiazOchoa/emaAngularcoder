import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesService } from '../../services/inscripciones.service';
import { UsuariosService } from '../../../usuarios/services/usuario.service';
import { CursoService } from '../../../cursos/service/curso.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nueva-inscripcion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>📝 Nueva Inscripción</h2>

      <form (ngSubmit)="guardar()">

        <!-- Usuario -->
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <select class="form-select" [(ngModel)]="idUsuario" name="usuario" required>
            <option value="">Seleccione...</option>
            <option *ngFor="let u of usuarios" [value]="u.id">
              {{ u.nombre }} {{ u.apellido }}
            </option>
          </select>
        </div>

        <!-- Curso -->
        <div class="mb-3">
          <label class="form-label">Curso</label>
          <select class="form-select" [(ngModel)]="idCurso" name="curso" required>
            <option value="">Seleccione...</option>
            <option *ngFor="let c of cursos" [value]="c.id">
              {{ c.nombre }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Guardar</button>
      </form>
    </div>
  `
})
export class NuevaInscripcionComponent {

  usuarios: any[] = [];
  cursos: any[] = [];

  idUsuario!: number;
  idCurso!: number;

  constructor(
    private inscripcionesService: InscripcionesService,
    private usuariosService: UsuariosService,
    private cursosService: CursoService,
  ) {}

  ngOnInit() {
    this.usuariosService.getAll().subscribe(u => this.usuarios = u);
    this.cursosService.getCursos().subscribe(c => this.cursos = c);
  }

  guardar() {
    if (!this.idUsuario || !this.idCurso) return;

    this.inscripcionesService.crearInscripcion({
      id: Date.now(),
      idUsuario: this.idUsuario,
      idCurso: this.idCurso,
      fecha: new Date().toISOString()
    });

    alert('Inscripción creada ✔️');
  }
}
