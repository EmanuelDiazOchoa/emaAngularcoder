import { createAction, props } from '@ngrx/store';
import { Curso } from '../../core/models/curso.model';


export const loadCursos = createAction('[Cursos] Load Cursos');
export const loadCursosSuccess = createAction(
  '[Cursos] Load Cursos Success',
  props<{ cursos: Curso[] }>()
);
export const loadCursosFailure = createAction(
  '[Cursos] Load Cursos Failure',
  props<{ error: string }>()
);


export const createCurso = createAction(
  '[Cursos] Create Curso',
  props<{ curso: Omit<Curso, 'id'> }>()
);
export const createCursoSuccess = createAction(
  '[Cursos] Create Curso Success',
  props<{ curso: Curso }>()
);
export const createCursoFailure = createAction(
  '[Cursos] Create Curso Failure',
  props<{ error: string }>()
);


export const updateCurso = createAction(
  '[Cursos] Update Curso',
  props<{ id: number; changes: Partial<Curso> }>()
);
export const updateCursoSuccess = createAction(
  '[Cursos] Update Curso Success',
  props<{ curso: Curso }>()
);
export const updateCursoFailure = createAction(
  '[Cursos] Update Curso Failure',
  props<{ error: string }>()
);


export const deleteCurso = createAction(
  '[Cursos] Delete Curso',
  props<{ id: number }>()
);
export const deleteCursoSuccess = createAction(
  '[Cursos] Delete Curso Success',
  props<{ id: number }>()
);
export const deleteCursoFailure = createAction(
  '[Cursos] Delete Curso Failure',
  props<{ error: string }>()
);