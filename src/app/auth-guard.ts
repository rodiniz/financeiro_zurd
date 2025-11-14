import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router=inject(Router);
  const isAutenticated= authService.isAuthenticated();
  if(!isAutenticated){
    router.navigate(['/']);
    return false;
  }
  return true;
};
