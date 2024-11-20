import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authAuthorizedGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (!user && !token) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
