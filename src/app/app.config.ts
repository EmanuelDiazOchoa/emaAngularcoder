import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
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

// 👇 Importar los nuevos reducers cuando los creemos
// import { alumnosReducer } from './store/alumnos/alumnos.reducer';
// import { cursosReducer } from './store/cursos/cursos.reducer';
// import { inscripcionesReducer } from './store/inscripciones/inscripciones.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]) // 👈 Agregar interceptor
    ),
    provideAnimations(),
    AuthService,
    provideStore({ 
      auth: authReducer
      // 👇 Agregar más reducers aquí
      // alumnos: alumnosReducer,
      // cursos: cursosReducer,
      // inscripciones: inscripcionesReducer
    }),
    provideEffects([AuthEffects]), // 👈 Agregar más effects después
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: false // 👈 Cambiar a false para dev
    }),
  ]
};