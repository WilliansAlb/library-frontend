import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { RoleEnum } from '../enums/role.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const authService: AuthService = inject(AuthService);
  const token = authService.getToken();
  if (token) {
    const userRoles = authService.getRoles();
    const allowedRoles = route.data['roles'];
    if (userRoles) {
      if (state.url.includes('login')) {
		void router.navigate(['']);
        return false;
      } else {
        for (let i = 0; i < allowedRoles.length; i++) {
          const element = allowedRoles[i];
          if (userRoles[element]) {
            return true;
          }
        }
		void router.navigate(['']);
        return false;
      }
    } else {
      authService.logout();
      void router.navigate(['login']);
      return false;
    }
  } else {
    if (state.url.includes('login')) {
      return true;
    } else {
      void router.navigate(['login']);
      return false;
    }
  }
};