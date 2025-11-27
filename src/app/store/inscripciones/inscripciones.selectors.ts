import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InscripcionesState } from './inscripciones.reducer';

export const selectInscripcionesState = createFeatureSelector<InscripcionesState>('inscripciones');

export const selectAllInscripciones = createSelector(
  selectInscripcionesState,
  (state) => state.inscripciones
);

export const selectInscripcionesLoading = createSelector(
  selectInscripcionesState,
  (state) => state.loading
);

export const selectInscripcionesError = createSelector(
  selectInscripcionesState,
  (state) => state.error
);

export const selectInscripcionById = (id: number) => createSelector(
  selectAllInscripciones,
  (inscripciones) => inscripciones.find(i => i.id === id)
);