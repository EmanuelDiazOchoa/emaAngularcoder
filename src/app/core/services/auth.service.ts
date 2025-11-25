import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from '../../store/auth/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:3000/users';
  private storageKey = 'user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Usuario | null> {
    return this.http
      .get<Usuario[]>(`${this.apiURL}?email=${email}`)
      .pipe(
        map(users => users.find(u => u.password === password) ?? null),
        tap(user => {
          if (user) {
            sessionStorage.setItem(this.storageKey, JSON.stringify(user));
          }
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
  }

  isLogged(): boolean {
    return !!sessionStorage.getItem(this.storageKey);
  }

  getCurrentUser(): Usuario | null {
    const raw = sessionStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.rol === 'admin';
  }

  getUsuarioActual() {
    return this.getCurrentUser();
  }
}
