import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CursosActions from './cursos.actions';
import { CursoService } from '../../features/cursos/service/curso.service';

@Injectable()
export class CursosEffects {
  private actions$ = inject(Actions);
  private cursosService = inject(CursoService);

  loadCursos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.loadCursos),
      mergeMap(() =>
        this.cursosService.getAll().pipe(
          map(cursos => CursosActions.loadCursosSuccess({ cursos })),
          catchError(error =>
            of(CursosActions.loadCursosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.createCurso),
      mergeMap(({ curso }) =>
        this.cursosService.create(curso).pipe(
          map(createdCurso => CursosActions.createCursoSuccess({ curso: createdCurso })),
          catchError(error =>
            of(CursosActions.createCursoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.updateCurso),
      mergeMap(({ id, changes }) =>
        this.cursosService.update(id, changes).pipe(
          map(updatedCurso => CursosActions.updateCursoSuccess({ curso: updatedCurso })),
          catchError(error =>
            of(CursosActions.updateCursoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursosActions.deleteCurso),
      mergeMap(({ id }) =>
        this.cursosService.delete(id).pipe(
          map(() => CursosActions.deleteCursoSuccess({ id })),
          catchError(error =>
            of(CursosActions.deleteCursoFailure({ error: error.message }))
          )
        )
      )
    )
  );
}