import { Injectable, Injector } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

import { AuthService } from "./guards/auth.service";
import { Observable } from "rxjs";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const accessToken = authService.getToken;
    if (accessToken) {
      request = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${accessToken}`)
      });
    }

    return next.handle(request);
  }
}