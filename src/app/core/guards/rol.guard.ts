import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const rolGuard: CanMatchFn = (route, segments) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const rolRequerido = route.data?.['rol'] as string;

  if (auth.getRol() === rolRequerido) {
    return true;
  }

  return router.createUrlTree(['/']);
};
