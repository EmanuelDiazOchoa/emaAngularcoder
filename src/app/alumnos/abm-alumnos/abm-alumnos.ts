import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: ['']
    });
  }

  agregar() {
    // lógica para agregar alumno
    console.log(this.form.value);
  }
}
