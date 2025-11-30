import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../core/models/usuario.model';
import * as UsuariosActions from './usuarios.actions';

export interface UsuariosState {
  usuarios: Usuario[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsuariosState = {
  usuarios: [],
  loading: false,
  error: null
};

export const usuariosReducer = createReducer(
  initialState,


  on(UsuariosActions.loadUsuarios, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsuariosActions.loadUsuariosSuccess, (state, { usuarios }) => ({
    ...state,
    usuarios,
    loading: false
  })),
  on(UsuariosActions.loadUsuariosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UsuariosActions.createUsuario, (state) => ({
    ...state,
    loading: true
  })),
  on(UsuariosActions.createUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    usuarios: [...state.usuarios, usuario],
    loading: false
  })),
  on(UsuariosActions.createUsuarioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UsuariosActions.updateUsuario, (state) => ({
    ...state,
    loading: true
  })),
  on(UsuariosActions.updateUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    usuarios: state.usuarios.map(u => u.id === usuario.id ? usuario : u),
    loading: false
  })),
  on(UsuariosActions.updateUsuarioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  on(UsuariosActions.deleteUsuario, (state) => ({
    ...state,
    loading: true
  })),
  on(UsuariosActions.deleteUsuarioSuccess, (state, { id }) => ({
    ...state,
    usuarios: state.usuarios.filter(u => u.id !== id),
    loading: false
  })),
  on(UsuariosActions.deleteUsuarioFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);