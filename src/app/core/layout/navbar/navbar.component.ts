import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { logout } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule,
    AsyncPipe
  ]
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  auth$!: Observable<AuthState>;
  user$!: Observable<any>;
  isLogged$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth$ = this.store.select('auth');

    this.user$ = this.auth$.pipe(
      map(state => state?.user || null)
    );

    this.isLogged$ = this.auth$.pipe(
      map(state => !!state?.user)
    );

    this.isAdmin$ = this.auth$.pipe(
      map(state => state?.user?.rol === 'admin')
    );
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}