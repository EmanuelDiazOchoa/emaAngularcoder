import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CursoService } from '../../service/curso.service';
import { Curso } from '../../../../core/models/curso.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abm-cursos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './abm-cursos.component.html'
})
export class AbmCursosComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cursosSvc = inject(CursoService);

  id = Number(this.route.snapshot.paramMap.get('id'));

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    duracion: ['', Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
  });

  ngOnInit() {
    if (this.id) {
      this.cursosSvc.getById(this.id).subscribe(c => {
        if (c) this.form.patchValue(c);
      });
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.id) {
      this.cursosSvc.update(this.id, data);
    } else {
      this.cursosSvc.add(data as Omit<Curso, 'id'>);
    }

    this.router.navigate(['/cursos']);
  }
}
