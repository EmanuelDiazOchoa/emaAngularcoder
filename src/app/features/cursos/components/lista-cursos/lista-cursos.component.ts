import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CursoService } from '../../service/curso.service';
import { Curso } from '../../../../core/models/curso.model';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-cursos.component.html'
})
export class ListaCursosComponent implements OnInit {

  cursos: Curso[] = [];

  constructor(
    private cursoService: CursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe(data => {
      this.cursos = data;
    });
  }

  nuevoCurso() {
    this.router.navigate(['cursos/nuevo']);
  }

  editarCurso(id: number) {
    this.router.navigate(['cursos/editar', id]);
  }

  eliminarCurso(id: number) {
    this.cursoService.delete(id);
  }
}
