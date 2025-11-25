import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';

import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => {
            if (!user) {
              return AuthActions.loginFailure({ error: 'Usuario no encontrado' });
            }
            return AuthActions.loginSuccess({ user });
          }),
          catchError(error =>
            of(AuthActions.loginFailure({ error: error?.message ?? 'Error desconocido' }))
          )
        )
      )
    )
  );
}


