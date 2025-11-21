import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionesService } from '../../services/inscripciones.service';
import { UsuariosService } from '../../../../core/services/usuario.service';
import { CursoService } from '../../../cursos/service/curso.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../../../core/models/usuario.model';
import { Curso } from '../../../../core/models/curso.model';

@Component({
  selector: 'app-nuevo-inscripcion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-inscripcion.component.html'
})
export class NuevoInscripcionComponent {

  usuarios$: Observable<Usuario[]>; 
  cursos$: Observable<Curso[]>;     

  usuarioSeleccionado?: number;
  cursoSeleccionado?: number;

  constructor(
    private inscripcionesService: InscripcionesService,
    private usuariosService: UsuariosService,
    private cursosService: CursoService
  ) {
    this.usuarios$ = this.usuariosService.getUsuarios();
    this.cursos$ = this.cursosService.obtenerCursos(); // 👈 CORRECTO
  }

  guardar() {
    if (!this.usuarioSeleccionado || !this.cursoSeleccionado) {
      alert('Debe seleccionar usuario y curso');
      return;
    }

    this.inscripcionesService.agregar({  // 👈 CORRECTO
      usuarioId: this.usuarioSeleccionado,
      cursoId: this.cursoSeleccionado,
      fecha: new Date().toISOString()
    });

    alert('✔️ Inscripción guardada!');
    this.usuarioSeleccionado = undefined;
    this.cursoSeleccionado = undefined;
  }
}
