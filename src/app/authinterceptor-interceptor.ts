import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from 'src/TokenService';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {  
  var service= inject(TokenService);
  var token= service.getAuthToken();
  if (token) {
      var newreq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
      });
      return next(newreq);
  }
  return next(req);
};
