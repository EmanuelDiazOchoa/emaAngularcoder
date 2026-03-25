import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthService } from './core/services/auth.service';
import { authInterceptor } from './core/interceptors/auth.interceptors';
import { alumnosReducer } from './store/alumnos/alumnos.reducer';
import { AlumnosEffects } from './store/alumnos/alumnos.effects';
import { cursosReducer } from './store/cursos/cursos.reducer';
import { CursosEffects } from './store/cursos/cursos.effects';
import { inscripcionesReducer } from './store/inscripciones/inscripciones.reducer';
import { InscripcionesEffects } from './store/inscripciones/inscripciones.effects';
import { usuariosReducer } from './store/usuarios/usuarios.reducer';
import { UsuariosEffects } from './store/usuarios/usuarios.effects';
import { AppState } from './store/app.state';
import { ActionReducerMap } from '@ngrx/store';

function getInitialAuthState() {
  try {
    const token = localStorage.getItem('auth_token');
    const userJson = localStorage.getItem('current_user');
    if (token && userJson) {
      return { user: JSON.parse(userJson) };
    }
  } catch {}
  return { user: null };
}

const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  alumnos: alumnosReducer,
  cursos: cursosReducer,
  inscripciones: inscripcionesReducer,
  usuarios: usuariosReducer
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations(),
    AuthService,
    provideStore(reducers, {
      initialState: {
        auth: getInitialAuthState()
      } 
    }),
    provideEffects([
      AuthEffects, 
      AlumnosEffects,
      CursosEffects,
      InscripcionesEffects,
      UsuariosEffects  
    ]),
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: false
    }),
  ]
};