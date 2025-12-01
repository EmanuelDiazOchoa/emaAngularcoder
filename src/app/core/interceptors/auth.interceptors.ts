import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');


  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((error) => {
    
      if (error.status === 401) {
      
        console.warn('⚠️ Sesión expirada o no autorizada');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
        router.navigate(['/login'], {
          queryParams: { sessionExpired: 'true' }
        });
      } else if (error.status === 403) {
      
        console.warn('⚠️ Acceso prohibido');
        router.navigate(['/dashboard']);
      } else if (error.status === 0) {
        
        console.error('❌ Error de conexión: El servidor no está disponible');
      }

      return throwError(() => error);
    })
  );
};