import { Injectable } from '@angular/core';
import { CanMatch, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { selectIsLogged, selectIsAdmin } from '../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanMatch {

  constructor(private store: Store, private router: Router) {}

  async canMatch() {
    const logged = await firstValueFrom(this.store.select(selectIsLogged));
    const isAdmin = await firstValueFrom(this.store.select(selectIsAdmin));

    if (!logged) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!isAdmin) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }
}
