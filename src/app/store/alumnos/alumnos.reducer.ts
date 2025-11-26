import { createReducer, on } from '@ngrx/store';
import { Alumno } from '../../core/models/alumnos.model';
import * as AlumnosActions from './alumnos.actions';

export interface AlumnosState {
  alumnos: Alumno[];
  loading: boolean;
  error: string | null;
}

export const initialState: AlumnosState = {
  alumnos: [],
  loading: false,
  error: null
};

export const alumnosReducer = createReducer(
  initialState,


  on(AlumnosActions.loadAlumnos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AlumnosActions.loadAlumnosSuccess, (state, { alumnos }) => ({
    ...state,
    alumnos,
    loading: false
  })),
  on(AlumnosActions.loadAlumnosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(AlumnosActions.createAlumno, (state) => ({
    ...state,
    loading: true
  })),
  on(AlumnosActions.createAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: [...state.alumnos, alumno],
    loading: false
  })),
  on(AlumnosActions.createAlumnoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(AlumnosActions.updateAlumno, (state) => ({
    ...state,
    loading: true
  })),
  on(AlumnosActions.updateAlumnoSuccess, (state, { alumno }) => ({
    ...state,
    alumnos: state.alumnos.map(a => a.id === alumno.id ? alumno : a),
    loading: false
  })),
  on(AlumnosActions.updateAlumnoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(AlumnosActions.deleteAlumno, (state) => ({
    ...state,
    loading: true
  })),
  on(AlumnosActions.deleteAlumnoSuccess, (state, { id }) => ({
    ...state,
    alumnos: state.alumnos.filter(a => a.id !== id),
    loading: false
  })),
  on(AlumnosActions.deleteAlumnoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);