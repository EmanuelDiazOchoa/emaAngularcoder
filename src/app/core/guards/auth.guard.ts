import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isLogged()) {
    return true;
  }

  console.log('❌ Acceso denegado - Redirigiendo a login');
  router.navigate(['/login']);
  return false;
};