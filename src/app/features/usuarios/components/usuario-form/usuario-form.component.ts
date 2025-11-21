import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private userService = inject(UsuariosService);
  private route = inject(ActivatedRoute);
  public router = inject(Router);


  form!: FormGroup;
  editingId?: number;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['user', Validators.required],
      password: ['']
    });

    // Si viene id, estamos editando
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingId = +id;
      this.userService.getById(this.editingId).subscribe(user => {
        if (user) this.form.patchValue(user);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.editingId) {
      this.userService.update(this.editingId, this.form.value).subscribe(() => {
        alert('Usuario editado con éxito');
        this.router.navigate(['/usuarios']);
      });
    } else {
      this.userService.add(this.form.value).subscribe(() => {
        alert('Usuario creado con éxito');
        this.router.navigate(['/usuarios']);
      });
    }
  }
}

