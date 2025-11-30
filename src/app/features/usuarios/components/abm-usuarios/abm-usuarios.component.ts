import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuariosService } from '../../../../core/services/usuario.service';
import { Usuario, Rol } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-abm-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './abm-usuarios.component.html'
})
export class AbmUsuariosComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuariosSvc = inject(UsuariosService);

  id = Number(this.route.snapshot.paramMap.get('id'));

  
  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    rol: this.fb.control<Rol>('user', Validators.required),
    password: [''],
  });

  ngOnInit(): void {
    if (this.id) {
      this.usuariosSvc.getById(this.id).subscribe(u => {
        if (u) this.form.patchValue(u);
      });
    }
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();

    if (this.id) {
      this.usuariosSvc.update(this.id, data as Partial<Usuario>).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    } else {
      this.usuariosSvc.add(data as Omit<Usuario, 'id' | 'fechaCreacion'>).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }
}
