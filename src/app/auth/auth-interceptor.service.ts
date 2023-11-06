import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(User => {

        if (!User) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', User.token)
      });
        return next.handle(modifiedReq);
      })
    );
  }
}
