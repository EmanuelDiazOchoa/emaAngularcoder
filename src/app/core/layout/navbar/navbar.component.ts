import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { logout } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.models';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    NgIf,
    AsyncPipe
  ]
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  auth$!: Observable<AuthState>;
  user$!: Observable<any>;
  isLogged$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;

  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

  ngOnInit(): void {
    this.auth$ = this.store.select('auth');

    this.user$ = this.auth$.pipe(map(state => state.user));
    this.isLogged$ = this.auth$.pipe(map(state => !!state.user));
    this.isAdmin$ = this.auth$.pipe(map(state => state.user?.rol === 'admin'));
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
