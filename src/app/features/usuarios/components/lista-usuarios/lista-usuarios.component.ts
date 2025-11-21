import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuario.service';
import { Usuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-usuarios.component.html'
})
export class ListaUsuariosComponent implements OnInit {

  private usuariosSvc = inject(UsuariosService);
  private router = inject(Router);

  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.usuariosSvc.getAll().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  nuevoUsuario() {
    this.router.navigate(['/usuarios/nuevo']);
  }

  editarUsuario(id: number) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  eliminarUsuario(id: number) {
    if (!confirm('¿Seguro que querés eliminar este usuario?')) return;
    this.usuariosSvc.delete(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }
}


