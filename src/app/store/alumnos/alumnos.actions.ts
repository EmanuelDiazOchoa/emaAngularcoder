import { createAction, props } from '@ngrx/store';
import { Alumno } from '../../core/models/alumnos.model';

export const loadAlumnos = createAction('[Alumnos] Load Alumnos');
export const loadAlumnosSuccess = createAction(
  '[Alumnos] Load Alumnos Success',
  props<{ alumnos: Alumno[] }>()
);
export const loadAlumnosFailure = createAction(
  '[Alumnos] Load Alumnos Failure',
  props<{ error: string }>()
);


export const createAlumno = createAction(
  '[Alumnos] Create Alumno',
  props<{ alumno: Omit<Alumno, 'id'> }>()
);
export const createAlumnoSuccess = createAction(
  '[Alumnos] Create Alumno Success',
  props<{ alumno: Alumno }>()
);
export const createAlumnoFailure = createAction(
  '[Alumnos] Create Alumno Failure',
  props<{ error: string }>()
);


export const updateAlumno = createAction(
  '[Alumnos] Update Alumno',
  props<{ id: number; changes: Partial<Alumno> }>()
);
export const updateAlumnoSuccess = createAction(
  '[Alumnos] Update Alumno Success',
  props<{ alumno: Alumno }>()
);
export const updateAlumnoFailure = createAction(
  '[Alumnos] Update Alumno Failure',
  props<{ error: string }>()
);


export const deleteAlumno = createAction(
  '[Alumnos] Delete Alumno',
  props<{ id: number }>()
);
export const deleteAlumnoSuccess = createAction(
  '[Alumnos] Delete Alumno Success',
  props<{ id: number }>()
);
export const deleteAlumnoFailure = createAction(
  '[Alumnos] Delete Alumno Failure',
  props<{ error: string }>()
);

