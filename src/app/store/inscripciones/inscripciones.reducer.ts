import { createReducer, on } from '@ngrx/store';
import { Inscripcion } from '../../core/models/inscripcion.model';
import * as InscripcionesActions from './inscripciones.actions';

export interface InscripcionesState {
  inscripciones: Inscripcion[];
  loading: boolean;
  error: string | null;
}

export const initialState: InscripcionesState = {
  inscripciones: [],
  loading: false,
  error: null
};

export const inscripcionesReducer = createReducer(
  initialState,

  
  on(InscripcionesActions.loadInscripciones, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, { inscripciones }) => ({
    ...state,
    inscripciones,
    loading: false
  })),
  on(InscripcionesActions.loadInscripcionesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

 
  on(InscripcionesActions.createInscripcion, (state) => ({
    ...state,
    loading: true
  })),
  on(InscripcionesActions.createInscripcionSuccess, (state, { inscripcion }) => ({
    ...state,
    inscripciones: [...state.inscripciones, inscripcion],
    loading: false
  })),
  on(InscripcionesActions.createInscripcionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  
  on(InscripcionesActions.deleteInscripcion, (state) => ({
    ...state,
    loading: true
  })),
  on(InscripcionesActions.deleteInscripcionSuccess, (state, { id }) => ({
    ...state,
    inscripciones: state.inscripciones.filter(i => i.id !== id),
    loading: false
  })),
  on(InscripcionesActions.deleteInscripcionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);