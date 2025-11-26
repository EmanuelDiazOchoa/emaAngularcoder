import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual$ = new BehaviorSubject<any>(null);
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {
    this.cargarUsuarioGuardado();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.usuarioActual$.next(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.usuarioActual$.next(null);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUsuarioActual(): any {
    return this.usuarioActual$.value;
  }

  isAdmin(): boolean {
    const usuario = this.getUsuarioActual();
    return usuario && usuario.rol === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private cargarUsuarioGuardado(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      // Aquí puedes hacer una llamada al backend para obtener el usuario
      // Por ahora, solo verificamos que exista el token
    }
  }
}
