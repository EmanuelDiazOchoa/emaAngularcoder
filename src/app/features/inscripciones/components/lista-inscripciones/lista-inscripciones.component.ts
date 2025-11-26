import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { InscripcionesService } from '../../services/inscripciones.service';
import { UsuariosService } from '../../../../core/services/usuario.service';
import { CursoService } from '../../../cursos/service/curso.service';
import { Inscripcion } from '../../../../core/models/inscripcion.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-inscripciones.component.html'
})
export class ListaInscripcionesComponent implements OnInit, OnDestroy {

  inscripciones: Inscripcion[] = [];
  usuarios: any[] = [];
  cursos: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private inscripcionesService: InscripcionesService,
    private usuariosService: UsuariosService,
    private cursosService: CursoService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe(u => this.usuarios = u);

    this.cursosService.obtenerCursos()
      .pipe(takeUntil(this.destroy$))
      .subscribe(c => this.cursos = c);

    this.inscripcionesService.obtenerInscripciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => {
        const user = this.auth.getUsuarioActual();
        this.inscripciones = this.auth.isAdmin() ? list : list.filter(i => i.usuarioId === user?.id);
      });
  }

  eliminar(id: number): void {
    if (!this.auth.isAdmin()) return;
    this.inscripcionesService.eliminar(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.inscripciones = this.inscripciones.filter(i => i.id !== id);
      });
  }

  getUsuarioNombre(usuarioId: number): string {
    const user = this.usuarios.find(u => u.id === usuarioId);
    return user ? `${user.nombre} ${user.apellido}` : 'Usuario desconocido';
  }

  getCursoNombre(cursoId: number): string {
    const curso = this.cursos.find(c => c.id === cursoId);
    return curso ? curso.nombre : 'Curso desconocido';
  }

  nuevaInscripcion(): void {
    this.router.navigate(['/dashboard/inscripciones/nueva']);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
