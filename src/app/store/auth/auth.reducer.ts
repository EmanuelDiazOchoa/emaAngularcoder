import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.models';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = { user: null, loading: false, error: null };

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.logout, _ => ({ user: null, loading: false, error: null }))
);
