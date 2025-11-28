import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectIsAdmin } from '../../store/auth/auth.selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAdmin).pipe(
    map(isAdmin => {
      if (isAdmin) {
        return true;
      }
      router.navigate(['/dashboard/alumnos']);
      return false;
    })
  );
};