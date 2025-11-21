import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AlumnosService } from '../services/alumnos.service';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.html',
  styleUrls: ['./abm-alumnos.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AbmAlumnosComponent {
  form: FormGroup;
  alumnosService = inject(AlumnosService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  agregar() {
    if (this.form.invalid) {
      return;
    }
    this.alumnosService.addAlumno(this.form.value);
    this.form.reset();
  }
}
