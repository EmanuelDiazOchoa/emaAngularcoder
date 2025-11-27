import { createReducer, on } from '@ngrx/store';
import { Curso } from '../../core/models/curso.model';
import * as CursosActions from './cursos.actions';

export interface CursosState {
  cursos: Curso[];
  loading: boolean;
  error: string | null;
}

export const initialState: CursosState = {
  cursos: [],
  loading: false,
  error: null
};

export const cursosReducer = createReducer(
  initialState,


  on(CursosActions.loadCursos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CursosActions.loadCursosSuccess, (state, { cursos }) => ({
    ...state,
    cursos,
    loading: false
  })),
  on(CursosActions.loadCursosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

 
  on(CursosActions.createCurso, (state) => ({
    ...state,
    loading: true
  })),
  on(CursosActions.createCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: [...state.cursos, curso],
    loading: false
  })),
  on(CursosActions.createCursoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

 
  on(CursosActions.updateCurso, (state) => ({
    ...state,
    loading: true
  })),
  on(CursosActions.updateCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: state.cursos.map(c => c.id === curso.id ? curso : c),
    loading: false
  })),
  on(CursosActions.updateCursoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  
  on(CursosActions.deleteCurso, (state) => ({
    ...state,
    loading: true
  })),
  on(CursosActions.deleteCursoSuccess, (state, { id }) => ({
    ...state,
    cursos: state.cursos.filter(c => c.id !== id),
    loading: false
  })),
  on(CursosActions.deleteCursoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);