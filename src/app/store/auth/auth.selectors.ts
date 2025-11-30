import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuth, s => s.user);
export const selectIsLogged = createSelector(selectUser, u => !!u);
export const selectIsAdmin = createSelector(selectUser, u => u?.rol === 'admin');
