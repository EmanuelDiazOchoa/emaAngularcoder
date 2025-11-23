import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { logout } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.models';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgIf
  ]
})
export class NavbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  user$!: Observable<any>;

  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {
    this.user$ = this.store.select('auth').pipe(map(state => state.user));
  }

  isLogged(): Observable<boolean> {
    return this.store.select('auth').pipe(map(state => !!state.user));
  }

  isAdmin(): Observable<boolean> {
    return this.store.select('auth').pipe(map(state => state.user?.rol === 'admin'));
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
