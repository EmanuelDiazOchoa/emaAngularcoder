import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthState } from '../../../store/auth/auth.models';
import { logout } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class SidebarComponent {
  private store = inject(Store<{ auth: AuthState }>);
  private router = inject(Router);

  
  currentUser$ = this.store.select('auth').pipe(
    map(state => state.user)
  );

  isAdmin$ = this.store.select('auth').pipe(
    map(state => state.user?.rol === 'admin')
  );

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}