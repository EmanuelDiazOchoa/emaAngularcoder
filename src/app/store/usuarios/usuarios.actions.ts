import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../core/models/usuario.model';


export const loadUsuarios = createAction('[Usuarios] Load Usuarios');
export const loadUsuariosSuccess = createAction(
  '[Usuarios] Load Usuarios Success',
  props<{ usuarios: Usuario[] }>()
);
export const loadUsuariosFailure = createAction(
  '[Usuarios] Load Usuarios Failure',
  props<{ error: string }>()
);


export const createUsuario = createAction(
  '[Usuarios] Create Usuario',
  props<{ usuario: Omit<Usuario, 'id' | 'fechaCreacion'> }>()
);
export const createUsuarioSuccess = createAction(
  '[Usuarios] Create Usuario Success',
  props<{ usuario: Usuario }>()
);
export const createUsuarioFailure = createAction(
  '[Usuarios] Create Usuario Failure',
  props<{ error: string }>()
);

export const updateUsuario = createAction(
  '[Usuarios] Update Usuario',
  props<{ id: number; changes: Partial<Usuario> }>()
);
export const updateUsuarioSuccess = createAction(
  '[Usuarios] Update Usuario Success',
  props<{ usuario: Usuario }>()
);
export const updateUsuarioFailure = createAction(
  '[Usuarios] Update Usuario Failure',
  props<{ error: string }>()
);

// DELETE
export const deleteUsuario = createAction(
  '[Usuarios] Delete Usuario',
  props<{ id: number }>()
);
export const deleteUsuarioSuccess = createAction(
  '[Usuarios] Delete Usuario Success',
  props<{ id: number }>()
);
export const deleteUsuarioFailure = createAction(
  '[Usuarios] Delete Usuario Failure',
  props<{ error: string }>()
);