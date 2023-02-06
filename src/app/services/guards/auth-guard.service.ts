import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public login: LoginService,
    public router: Router) { }

    canActivate(): boolean {
      if (!this.login.isAuthenticated()) {
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
    }
}
