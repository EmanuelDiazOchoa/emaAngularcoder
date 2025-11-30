import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursosState } from './cursos.reducer';

export const selectCursosState = createFeatureSelector<CursosState>('cursos');

export const selectAllCursos = createSelector(
  selectCursosState,
  (state) => state.cursos
);

export const selectCursosLoading = createSelector(
  selectCursosState,
  (state) => state.loading
);

export const selectCursosError = createSelector(
  selectCursosState,
  (state) => state.error
);

export const selectCursoById = (id: number) => createSelector(
  selectAllCursos,
  (cursos) => cursos.find(c => c.id === id)
);