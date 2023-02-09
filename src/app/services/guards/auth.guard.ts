import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url = 'http://localhost:4200/api/';
  constructor(private router: Router,private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | any {
    const id = sessionStorage.getItem('id');
    const jwtToken = sessionStorage.getItem('jwt');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken,
      })
    };

    if (jwtToken) {
      return this.http.get(`${this.url}user/${id}`, reqHeader).pipe(
        map(res => {
          if (res === Number(id)) {
            return true;
          } else {
            this.router.navigateByUrl('login');
            return false;
          }
        }),
        catchError((err) => {
          return of(false);
        })
      );
    } else {
      this.router.navigateByUrl('dashboard');
      return false;
    }
  }
 
  
}
