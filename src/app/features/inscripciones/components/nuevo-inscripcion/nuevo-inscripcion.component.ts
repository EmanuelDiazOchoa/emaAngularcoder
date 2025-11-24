import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionesService } from '../../services/inscripciones.service';
import { UsuariosService } from '../../../../core/services/usuario.service';
import { CursoService } from '../../../cursos/service/curso.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../store/auth/auth.models';
import { map, Observable } from 'rxjs';

import { Usuario } from '../../../../core/models/usuario.model';
import { Curso } from '../../../../core/models/curso.model';
import { Usuario as AuthUsuario } from '../../../../store/auth/auth.models';

@Component({
  selector: 'app-nuevo-inscripcion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-inscripcion.component.html'
})
export class NuevoInscripcionComponent implements OnInit {

  // Listados para selects
  usuarios$!: Observable<Usuario[]>;
  cursos$!: Observable<Curso[]>;

  // Valores seleccionados
  usuarioSeleccionado?: number;
  cursoSeleccionado?: number;
  // Observables de autenticación
  usuarioActual$!: Observable<AuthUsuario | null>;
  esAdmin$!: Observable<boolean>;

  constructor(
    private inscripcionesService: InscripcionesService,
    private usuariosService: UsuariosService,
    private cursosService: CursoService,
    private store: Store<{ auth: AuthState }>
  ) {
    this.usuarios$ = this.usuariosService.getUsuarios();
    this.cursos$ = this.cursosService.obtenerCursos();
  }

  ngOnInit(): void {
    const auth$ = this.store.select('auth');

    this.usuarioActual$ = auth$.pipe(map(state => state.user));
    this.esAdmin$ = auth$.pipe(map(state => state.user?.rol === 'admin'));
  }

  guardar() {
    this.usuarioActual$.subscribe(usuario => {

      // Si NO es admin, solo puede inscribir su propio ID
      const usuarioId = usuario?.rol === 'admin'
        ? this.usuarioSeleccionado
        : usuario?.id;

      if (!usuarioId || !this.cursoSeleccionado) {
        alert('Debe seleccionar un curso');
        return;
      }

      this.inscripcionesService.agregar({
        usuarioId,
        cursoId: this.cursoSeleccionado,
        fecha: new Date().toISOString()
      });

      alert('✔️ Inscripción guardada');
      this.usuarioSeleccionado = undefined;
      this.cursoSeleccionado = undefined;
    });
  }
}

