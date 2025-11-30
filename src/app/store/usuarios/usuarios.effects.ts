import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as UsuariosActions from './usuarios.actions';
import { UsuariosService } from '../../core/services/usuario.service';

@Injectable()
export class UsuariosEffects {
  private actions$ = inject(Actions);
  private usuariosService = inject(UsuariosService);

  loadUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.loadUsuarios),
      mergeMap(() =>
        this.usuariosService.getAll().pipe(
          map(usuarios => UsuariosActions.loadUsuariosSuccess({ usuarios })),
          catchError(error =>
            of(UsuariosActions.loadUsuariosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.createUsuario),
      mergeMap(({ usuario }) =>
        this.usuariosService.create(usuario).pipe(
          map(createdUsuario => UsuariosActions.createUsuarioSuccess({ usuario: createdUsuario })),
          catchError(error =>
            of(UsuariosActions.createUsuarioFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.updateUsuario),
      mergeMap(({ id, changes }) =>
        this.usuariosService.update(id, changes).pipe(
          map(updatedUsuario => UsuariosActions.updateUsuarioSuccess({ usuario: updatedUsuario })),
          catchError(error =>
            of(UsuariosActions.updateUsuarioFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuariosActions.deleteUsuario),
      mergeMap(({ id }) =>
        this.usuariosService.delete(id).pipe(
          map(() => UsuariosActions.deleteUsuarioSuccess({ id })),
          catchError(error =>
            of(UsuariosActions.deleteUsuarioFailure({ error: error.message }))
          )
        )
      )
    )
  );
}