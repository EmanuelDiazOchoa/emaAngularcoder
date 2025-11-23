
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const rolGuard: CanMatchFn = (route, segments) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredRol = route.data?.['rol'] as string | undefined;

  
  if (!auth.isLogged()) {
    router.navigate(['/login']);
    return false;
  }

  
  if (!requiredRol) {
    return true;
  }

  
  if (auth.getRol() === requiredRol) {
    return true;
  }

  
  router.navigate(['/forbidden']);
  return false;
};