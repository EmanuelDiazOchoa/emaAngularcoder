import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as AlumnosActions from './alumnos.actions';
import { AlumnosService } from '../../features/alumnos/services/alumnos.service';

@Injectable()
export class AlumnosEffects {
  private actions$ = inject(Actions);
  private alumnosService = inject(AlumnosService);

  loadAlumnos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.loadAlumnos),
      mergeMap(() =>
        this.alumnosService.getAll().pipe(
          map(alumnos => AlumnosActions.loadAlumnosSuccess({ alumnos })),
          catchError(error =>
            of(AlumnosActions.loadAlumnosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createAlumno$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.createAlumno),
      mergeMap(({ alumno }) =>
        this.alumnosService.create(alumno).pipe(
          map(createdAlumno => AlumnosActions.createAlumnoSuccess({ alumno: createdAlumno })),
          catchError(error =>
            of(AlumnosActions.createAlumnoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateAlumno$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.updateAlumno),
      mergeMap(({ id, changes }) =>
        this.alumnosService.update(id, changes).pipe(
          map(updatedAlumno => AlumnosActions.updateAlumnoSuccess({ alumno: updatedAlumno })),
          catchError(error =>
            of(AlumnosActions.updateAlumnoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteAlumno$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlumnosActions.deleteAlumno),
      mergeMap(({ id }) =>
        this.alumnosService.delete(id).pipe(
          map(() => AlumnosActions.deleteAlumnoSuccess({ id })),
          catchError(error =>
            of(AlumnosActions.deleteAlumnoFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
