import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as InscripcionesActions from './inscripciones.actions';
import { InscripcionesService } from '../../features/inscripciones/services/inscripciones.service';

@Injectable()
export class InscripcionesEffects {
  private actions$ = inject(Actions);
  private inscripcionesService = inject(InscripcionesService);

  loadInscripciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.loadInscripciones),
      mergeMap(() =>
        this.inscripcionesService.getAll().pipe(
          map(inscripciones => InscripcionesActions.loadInscripcionesSuccess({ inscripciones })),
          catchError(error =>
            of(InscripcionesActions.loadInscripcionesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createInscripcion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.createInscripcion),
      mergeMap(({ inscripcion }) =>
        this.inscripcionesService.create(inscripcion).pipe(
          map(createdInscripcion => InscripcionesActions.createInscripcionSuccess({ inscripcion: createdInscripcion })),
          catchError(error =>
            of(InscripcionesActions.createInscripcionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteInscripcion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionesActions.deleteInscripcion),
      mergeMap(({ id }) =>
        this.inscripcionesService.delete(id).pipe(
          map(() => InscripcionesActions.deleteInscripcionSuccess({ id })),
          catchError(error =>
            of(InscripcionesActions.deleteInscripcionFailure({ error: error.message }))
          )
        )
      )
    )
  );
}