import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsuariosState } from './usuarios.reducer';


export const selectUsuariosState = createFeatureSelector<UsuariosState>('usuarios');


export const selectAllUsuarios = createSelector(
  selectUsuariosState,
  (state: UsuariosState) => state.usuarios
);


export const selectUsuariosLoading = createSelector(
  selectUsuariosState,
  (state: UsuariosState) => state.loading
);


export const selectUsuariosError = createSelector(
  selectUsuariosState,
  (state: UsuariosState) => state.error
);


export const selectUsuarioById = (id: number) => createSelector(
  selectAllUsuarios,
  (usuarios) => usuarios.find(u => u.id === id)
);