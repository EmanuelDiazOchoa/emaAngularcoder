import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { InscripcionesService } from '../../services/inscripciones.service';
import { UsuariosService } from '../../../../core/services/usuario.service';
import { CursoService } from '../../../cursos/service/curso.service';
import { Inscripcion } from '../../../../core/models/inscripcion.model';

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-inscripciones.component.html'
})
export class ListaInscripcionesComponent implements OnInit {

  inscripciones: Inscripcion[] = [];
  usuarios: any[] = [];
  cursos: any[] = [];

  constructor(
    private inscripcionesService: InscripcionesService,
    private usuariosService: UsuariosService,
    private cursosService: CursoService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(u => this.usuarios = u);
    this.cursosService.obtenerCursos().subscribe(c => this.cursos = c);

    this.inscripcionesService.obtenerInscripciones().subscribe(list => {
      const user = this.auth.getUsuarioActual();
      this.inscripciones = this.auth.isAdmin() ? list : list.filter(i => i.usuarioId === user?.id);
    });
  }

  // 👉 Solo Admin puede eliminar
  eliminar(id: number): void {
    if (!this.auth.isAdmin()) return;
    this.inscripcionesService.eliminar(id);
  }

  // 👉 Obtener nombre del usuario
  getUsuarioNombre(usuarioId: number): string {
    const user = this.usuarios.find(u => u.id === usuarioId);
    return user ? `${user.nombre} ${user.apellido}` : 'Usuario desconocido';
  }

  // 👉 Obtener nombre del curso
  getCursoNombre(cursoId: number): string {
    const curso = this.cursos.find(c => c.id === cursoId);
    return curso ? curso.nombre : 'Curso desconocido';
  }

  nuevaInscripcion(): void {
  // Aquí deberías abrir modal o navegar, pero sin console.log
  alert('Función no implementada');
}

}
