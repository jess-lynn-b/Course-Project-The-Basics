import { inject} from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router} from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currUser.pipe (
    take(1),
    map((user) => {
      const isAuth = !!user;

      if (isAuth) {
        if(route.routeConfig?.path === 'auth') {
          return router.createUrlTree(['/welcome']);
        }
        return true;
      } else {
        if (route.routeConfig?.path === 'auth') {
          return true;
        }

        return router.createUrlTree(['/welcome']);
      }
    })
  );
};


