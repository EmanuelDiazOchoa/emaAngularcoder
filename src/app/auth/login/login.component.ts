import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Rol } from '../../core/models/usuario.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class LoginComponent {

  // 👇 FormBuilder INYECTADO con inject()
  private fb = inject(FormBuilder);

  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rol: ['', Validators.required], // 👈 rol es requerido
  });

  ingresar() {
    if (this.form.invalid) return;

    const { email, password, rol } = this.form.value;

    
    const ok = this.auth.login(email!, password!, rol as Rol);

    if (ok) {
      this.router.navigate(['/alumnos']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}

