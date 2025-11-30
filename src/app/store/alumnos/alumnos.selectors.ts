import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlumnosState } from './alumnos.reducer';

export const selectAlumnosState = createFeatureSelector<AlumnosState>('alumnos');

export const selectAllAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.alumnos
);

export const selectAlumnosLoading = createSelector(
  selectAlumnosState,
  (state) => state.loading
);

export const selectAlumnosError = createSelector(
  selectAlumnosState,
  (state) => state.error
);

export const selectAlumnoById = (id: number) => createSelector(
  selectAllAlumnos,
  (alumnos) => alumnos.find(a => a.id === id)
);