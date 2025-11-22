import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class rolGuard implements CanMatch {

  constructor(private auth: AuthService, private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean {

    const requiredRol = route.data?.['rol'] as string | undefined;

    if (!this.auth.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!requiredRol) return true;

    if (this.auth.getRol() === requiredRol) return true;

    this.router.navigate(['/forbidden']);
    return false;
  }
}
