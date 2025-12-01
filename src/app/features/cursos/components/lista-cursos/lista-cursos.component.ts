import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import * as CursosActions from '../../../../store/cursos/cursos.actions';
import { selectAllCursos, selectCursosLoading, selectCursosError } from '../../../../store/cursos/cursos.selectors';
import { selectIsAdmin } from '../../../../store/auth/auth.selectors';

import { Curso } from '../../../../core/models/curso.model';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class ListaCursosComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  cursos$: Observable<Curso[]> = this.store.select(selectAllCursos);
  loading$: Observable<boolean> = this.store.select(selectCursosLoading);
  error$: Observable<string | null> = this.store.select(selectCursosError);
  isAdmin$: Observable<boolean> = this.store.select(selectIsAdmin);

  columnas = ['id', 'nombre', 'descripcion', 'duracion', 'clases', 'profesor', 'fechas', 'acciones'];
  isMobile = false;

  ngOnInit(): void {
    this.store.dispatch(CursosActions.loadCursos());
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  nuevoCurso(): void {
    this.router.navigate(['/dashboard/cursos/nuevo']);
  }

  editarCurso(id: number): void {
    this.router.navigate(['/dashboard/cursos/editar', id]);
  }

  verDetalle(curso: Curso): void {
    const mensaje = `
📚 DETALLES DEL CURSO

📖 Nombre: ${curso.nombre}
📝 Descripción: ${curso.descripcion}
⏱️ Duración: ${curso.duracion}
📊 Cantidad de Clases: ${curso.cantidadClases}
👨‍🏫 Profesor: ${curso.profesor}
📅 Inicio: ${curso.fechaInicio}
📅 Fin: ${curso.fechaFin}
    `.trim();

    alert(mensaje);
  }

  eliminarCurso(id: number): void {
    if (confirm('¿Está seguro de eliminar este curso?')) {
      this.store.dispatch(CursosActions.deleteCurso({ id }));
      this.snackBar.open('Curso eliminado correctamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
  }
}