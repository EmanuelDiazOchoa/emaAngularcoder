import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { AuthService } from '../../core/services/auth.service';

// Angular Material UI
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  form!: FormGroup; // 👈 ya no se inicializa aquí arriba

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {
    // 👇 Ahora sí: inicializamos el formulario en el constructor
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ingresar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.authService.login(email!, password!).subscribe(user => {
      if (user) {
        this.store.dispatch(AuthActions.loginSuccess({ user }));
        this.router.navigate(['/dashboard']);
      } else {
        alert('Credenciales inválidas');
      }
    });
  }
}
