import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { AuthState } from './auth.models';

export const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,

  on(loginSuccess, (state, { user }) => ({
    ...state,
    user
  })),

  on(logout, state => ({
    ...state,
    user: null
  }))
);
