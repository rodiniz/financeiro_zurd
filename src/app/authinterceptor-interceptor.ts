import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {  
  var service= inject(AuthService);
  var token= service.getAuthToken();
  if (token) {
    req = req.clone({
        setHeaders: {
        Authorization: `Bearer ${token}`
        }
    });
  }
  return next(req);
};
