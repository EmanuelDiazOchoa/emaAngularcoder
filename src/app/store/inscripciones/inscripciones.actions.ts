import { createAction, props } from '@ngrx/store';
import { Inscripcion } from '../../core/models/inscripcion.model';

export const loadInscripciones = createAction('[Inscripciones] Load Inscripciones');
export const loadInscripcionesSuccess = createAction(
  '[Inscripciones] Load Inscripciones Success',
  props<{ inscripciones: Inscripcion[] }>()
);
export const loadInscripcionesFailure = createAction(
  '[Inscripciones] Load Inscripciones Failure',
  props<{ error: string }>()
);


export const createInscripcion = createAction(
  '[Inscripciones] Create Inscripcion',
  props<{ inscripcion: Omit<Inscripcion, 'id'> }>()
);
export const createInscripcionSuccess = createAction(
  '[Inscripciones] Create Inscripcion Success',
  props<{ inscripcion: Inscripcion }>()
);
export const createInscripcionFailure = createAction(
  '[Inscripciones] Create Inscripcion Failure',
  props<{ error: string }>()
);


export const deleteInscripcion = createAction(
  '[Inscripciones] Delete Inscripcion',
  props<{ id: number }>()
);
export const deleteInscripcionSuccess = createAction(
  '[Inscripciones] Delete Inscripcion Success',
  props<{ id: number }>()
);
export const deleteInscripcionFailure = createAction(
  '[Inscripciones] Delete Inscripcion Failure',
  props<{ error: string }>()
);