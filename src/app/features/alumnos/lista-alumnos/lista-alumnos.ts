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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as AlumnosActions from '../../../store/alumnos/alumnos.actions';
import { selectAllAlumnos, selectAlumnosLoading, selectAlumnosError } from '../../../store/alumnos/alumnos.selectors';
import { Alumno } from '../../../core/models/alumnos.model';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.html',
  styleUrls: ['./lista-alumnos.scss'],
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
    MatDialogModule,
    MatSnackBarModule,
    NombreCompletoPipe
  ]
})
export class ListaAlumnosComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);


  alumnos$: Observable<Alumno[]> = this.store.select(selectAllAlumnos);
  loading$: Observable<boolean> = this.store.select(selectAlumnosLoading);
  error$: Observable<string | null> = this.store.select(selectAlumnosError);

  columnas = ['id', 'nombre', 'email', 'perfil', 'telefono', 'fecha', 'acciones'];
  

  isMobile = false;

  ngOnInit(): void {

    this.store.dispatch(AlumnosActions.loadAlumnos());
    
    
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  nuevoAlumno(): void {
    this.router.navigate(['/dashboard/alumnos/nuevo']);
  }

  editarAlumno(id: number): void {
    this.router.navigate(['/dashboard/alumnos/editar', id]);
  }

  verDetalle(id: number): void {
    this.router.navigate(['/dashboard/alumnos/detalle', id]);
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Está seguro de eliminar este alumno?')) {
      this.store.dispatch(AlumnosActions.deleteAlumno({ id }));
      this.snackBar.open('Alumno eliminado correctamente', 'Cerrar', {
        duration: 3000
      });
    }
  }
}