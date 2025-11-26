import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual$ = new BehaviorSubject<Usuario | null>(null);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor(private http: HttpClient) {
    this.cargarUsuarioGuardado();
  }


  login(email: string, password: string): Observable<Usuario | null> {
    
    return this.http.get<Usuario[]>(`${environment.apiUrl}/users`, {
      params: { email, password }
    }).pipe(
      map(users => {
        if (users && users.length > 0) {
          const user = users[0];
          
          const fakeToken = btoa(`${email}:${Date.now()}`);
          localStorage.setItem(this.TOKEN_KEY, fakeToken);
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this.usuarioActual$.next(user);
          return user;
        }
        return null;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.usuarioActual$.next(null);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY) && !!this.usuarioActual$.value;
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual$.value;
  }

  getUsuarioActual$(): Observable<Usuario | null> {
    return this.usuarioActual$.asObservable();
  }

  isAdmin(): boolean {
    const usuario = this.getUsuarioActual();
    return usuario?.rol === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private cargarUsuarioGuardado(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userJson = localStorage.getItem(this.USER_KEY);
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.usuarioActual$.next(user);
      } catch (e) {
        this.logout();
      }
    }
  }
}